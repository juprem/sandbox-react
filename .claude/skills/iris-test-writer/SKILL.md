---
name: iris-test-writer
description: >
  Writes JUnit 5 unit tests for Java service classes in the IRIS project,
  following its exact test conventions: Mockito with @InjectMocks, @Nested
  classes per method, Given_When_Then test names in French, and a companion
  @UtilityClass fixture file. Use this skill whenever the user asks to write,
  add, or generate unit tests for a service in the IRIS codebase — including
  any `*ServiceImpl`, `*Service`, or domain service class. Also use when they
  ask to "test a method", "cover a function", or "write tests for step X".
---

# IRIS Test Writer

## What this skill produces

For a given service method, produce two things:
1. A `@Nested` block to add to the existing `*Test.java` (or a new test class if none exists)
2. New fixture factory methods for the companion `*Fixture.java`

Always read both the service implementation file AND the existing test/fixture files before generating anything. The generated tests must compile against the actual field names and method signatures in the codebase.

---

## Test class structure

```java
@ExtendWith(MockitoExtension.class)   // always, no Spring context
class FooServiceImplTest {

    // One @Mock per constructor-injected dependency
    @Mock private XxxRepository xxxRepository;
    @Mock private YyySpi yyySpi;

    @InjectMocks
    private FooServiceImpl service;   // no new FooServiceImpl(...) — Mockito does it

    // No @BeforeEach — every test is self-contained

    @Nested
    class NomDeLaMethode {            // exact method name, PascalCase
        @Test
        void donneXxx_nomDeLaMethode_alorsYyy() { ... }
    }
}
```

**File placement:** `src/test/java/<same package as the class under test>/`

**Class name:** `<ClassName>Test` in the same package (no sub-package).

---

## @Nested class per method

Each public or package-private method under test gets its own `@Nested` class named after the method in PascalCase:
- `creationNouveauBeneficiaire` → `class CreationNouveauBeneficiaire`
- `recupererEntitesJuridiques` → `class RecupererEntitesJuridiques`

Private helper methods used only within one nested class go **inside** that nested class, not at the outer level.

---

## Test method naming

Pattern: `donne<Context>_<methodeName>_<expectedOutcome>()`

All three segments in French camelCase:
- `donneMailNull_creationNouveauBeneficiaire_neCreePasDeBeneficiaire`
- `donneBeneficiairesVide_recupererEntitesJuridiques_retourneListeVide`
- `donneBeneficiaireValide_creationNouveauBeneficiaire_mappeChampsDuLprTemp`

The method name segment is the **exact Java method name** (camelCase), not a paraphrase.

---

## Test body layout

```java
@Test
void donneSirenInconnu_methode_retourneListeVide() {
    // GIVEN
    when(repo.findBySirenIn(...)).thenReturn(List.of());

    // WHEN
    var result = service.methode(...);

    // THEN
    assertTrue(result.isEmpty());
}
```

Collapse GIVEN/WHEN into `// GIVEN / WHEN` only when there is genuinely no setup.
Collapse WHEN/THEN into `// WHEN / THEN` only when the assertion is on a side effect triggered by WHEN.

---

## What to mock and what not to

Mock only **boundaries**: repositories, SPI ports (`*Spi`), Feign clients, Kafka producers.  
Do **not** mock: domain model builders, utility classes (`ValidationFormatUtils`), enum values, or `LocalDate`.

Mockito returns sensible defaults for unmocked methods:
- `List`-returning methods → `List.of()` (empty list) — exploit this for negative tests to avoid verbose setup
- `Long`-returning methods → `0L`
- `boolean`-returning methods → `false`

Use this to keep negative tests (where the SUT filters/rejects early) minimal — only stub what the path actually reaches.

---

## Verification patterns

**Was a dependency called?**
```java
verify(repo).save(any(FooEntity.class));
verify(spi, never()).sauvegarder(any());   // negative
```

**What was passed to a dependency?**
```java
ArgumentCaptor<FooEntity> captor = ArgumentCaptor.forClass(FooEntity.class);
verify(repo).save(captor.capture());
FooEntity entity = captor.getValue();
assertEquals("expected", entity.getField());
```

**Ordering matters?**
```java
InOrder ordre = inOrder(spi);
ordre.verify(spi).recupererCompteur();
ordre.verify(spi).incrementerCompteur();
ordre.verify(spi).sauvegarder(any());
```

**Collection arguments where exact content isn't the point:**
```java
when(repo.findByIdIn(anyCollection())).thenReturn(List.of(entity));
```
Use `anyCollection()` rather than a specific `Set.of(...)` unless the test is specifically about which IDs are passed.

---

## Fixture class

The fixture is a companion `@UtilityClass` in the same package:

```java
@UtilityClass
public class FooServiceFixture {

    public static FooEntity fooEntity(Long id, String field) {
        return FooEntity.builder()
                .id(id)
                .field(field)
                .build();
    }
}
```

**Rules:**
- All methods are `public static`
- Named semantically after what they create, not generically (`entiteJuridique(id, siren, code)` not `createEntity()`)
- Parameters only for fields that vary across tests; hardcode realistic but stable values for the rest
- Entities from TopModel (`src/main/javagen`) always have `@Builder` — use `.builder()...build()`
- Avro DTOs use `.newBuilder()...build()`
- The test class imports all fixture methods with `import static ...Fixture.*`

Add new fixture methods when the entity or variant is genuinely new. Reuse existing ones.

---

## Practical checklist before writing tests

1. Read the method under test — identify inputs, outputs, branches, and dependencies called
2. Read the existing test file (if any) — check which mocks are already declared and which fixture methods exist
3. Read the fixture file — avoid duplicating factory methods
4. Plan one `@Test` per logical branch, boundary condition, or observable output
5. For methods with multiple sequential steps, write at least:
   - One negative test per filter/rejection step (verifies the SUT stops early)
   - One positive test per key output (verifies the SUT produces the right result)
   - One ordering test if sequence matters (use `inOrder`)
   - One field-mapping test if the method constructs a domain object (use `ArgumentCaptor`)

---

## Example: typical negative test (step filtered early)

When a method has sequential filtering steps (validate → associate → filter → create), a beneficiaire rejected in step 1 means steps 2–4 are never reached, so their dependencies never need stubbing:

```java
@Test
void donneMailInvalide_creationNouveauBeneficiaire_neCreePasDeBeneficiaire() {
    LprTemp lpr = LprTemp.builder().annee(2025).mois(9).siren("123456789")
            .mail("pas-un-email").siPresent(1).build();

    service.creationNouveauBeneficiaire(List.of(lpr), List.of(entite));

    verify(beneficiairesSpi, never()).sauvegarderBeneficiaire(any());
}
```

No `when(...)` needed — Mockito's empty-list default prevents any NPE in later steps.

---

## Example: field-mapping positive test

```java
@Test
void donneBeneficiaireValide_creationNouveauBeneficiaire_mappeChampsDuLprTemp() {
    mockAutorisationValide();
    when(beneficiairesSpi.recupererDerniereValeurCompteurNumeroCgos()).thenReturn(0L);

    service.creationNouveauBeneficiaire(List.of(lprTempValide("123456789")), List.of(entite));

    ArgumentCaptor<Beneficiaire> captor = ArgumentCaptor.forClass(Beneficiaire.class);
    verify(beneficiairesSpi).sauvegarderBeneficiaire(captor.capture());
    Beneficiaire b = captor.getValue();
    assertEquals(TypeBeneficiaireEnum.AGENT, b.getTypeBeneficiaire());
    assertEquals("1234567890123", b.getNumeroNirCcss());
    assertEquals(LocalDate.of(2020, 1, 15), b.getDateEntreeFph());
    assertNull(b.getDateSortieFph());
}
```

Private helpers that set up multiple mocks together belong inside the `@Nested` class:
```java
private void mockAutorisationValide() {
    mockRattache(rattache(entite, etablissement(true)));
    mockSituationListePresence(situationListePresence(entite, true));
}
```
