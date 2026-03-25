---
name: iris-topmodel-writer
description: >
  Creates or modifies TopModel `.tmd` files in the IRIS project's `iris-model/`
  directory. Use this skill whenever the user asks to add a new entity, domain
  object, DTO, endpoint, enum, decorator, or domain type to the model — or when
  they ask to update an existing `.tmd` file. Also use when they say "add to the
  model", "create a TopModel class", or "generate the .tmd for X".
---

# IRIS TopModel Writer

## What this skill produces

For a given modelling request, produce one or more `.tmd` files in the correct
subdirectory under `iris-model/<Module>/` following the exact syntax and
conventions of the project.

Always read related existing `.tmd` files before writing anything — to reuse the
correct `uses:` paths, domain names, existing class/property names, and tags.

---

## File & directory layout

```
iris-model/
  Domains.tmd                   # global domain types (read-only — shared)
  decorators.tmd                # global decorators (StatutActif, AuditableEntity…)
  decorators/
    commons.tmd                 # annotations: ApiInterne, ApiCgos, LibelleEnum…
    lombok.tmd                  # Lombok annotations
  <Module>/                     # e.g. Acteur, Workflow, Parametrage…
    Api/                        # REST endpoint definitions
    Data/                       # JPA entity definitions
      projection/               # read-only projection interfaces
    Domain/                     # domain object definitions
    Dto/                        # DTO definitions
    decorators.tmd              # module-specific decorators
```

One `.tmd` file may contain **multiple** blocks separated by `---`.
Place logically related definitions in the same file (same concept/table).

---

## File anatomy

```yaml
# optional comment at top
---
module: Acteur          # module name — all classes in the file share this
uses:                   # import paths (no .tmd extension, relative to iris-model/)
  - Acteur/Data/BeneficiaireEntity
  - decorators/lombok
  - decorators/commons
tags:
  - back-acteur         # controls which generator targets receive this class
  - front-acteur
---
# first block definition
class: ...
---
# second block definition (optional)
class: ...
```

The header section (before the first `---`) may be omitted for the very first
block; in practice it is always present.

### Tags reference

| Tag | Effect |
|---|---|
| `back-<module>` | Generated into `iris-<module>-service/src/main/javagen` |
| `back-data-<module>` | Entity classes (JPA) |
| `back-domain-<module>` | Domain model classes |
| `back-dto-<module>` | DTO classes |
| `front-<module>` | Generated into `iris-frontend/src/model` and `src/services` |
| `<other>-<module>-api` | Exposes types to a consumer service's feign client |

---

## Block types

### 1. `domain:` — type definition

Defined in `Domains.tmd`. **Do not add new domains unless strictly necessary.**
Always prefer an existing `DO_*` domain.

```yaml
domain:
  name: DO_LIBELLE            # always uppercase with DO_ prefix
  label: Libellé
  length: 50                  # optional — used for SQL varchar length
  ts:
    type: string
  java:
    type: String
    imports:                  # only when the Java type needs an import
      - java.math.BigDecimal
  sql:
    type: varchar
  asDomains:                  # derived domains for lists, criteria, etc.
    list: DO_LIST
    criteria: DO_CRITERIA_STRING
    criteriaList: DO_CRITERIA_STRING_LIST
```

Common domains to reuse:

| Domain | Java type | Use for |
|---|---|---|
| `DO_ID` | `Long` (auto-generated) | PK on entities |
| `DO_ID_EXT` | `Long` (no auto-gen) | FK to another service |
| `DO_LIBELLE` | `String(50)` | Short label |
| `DO_CODE` | `String(32)` | Code / key |
| `DO_CODE_ENUM` | `String(127)` | Enum code |
| `DO_STRING` | `String(255)` | General string |
| `DO_TEXTE` | `String(1000)` | Longer text |
| `DO_BOOLEAN` | `Boolean` | Nullable boolean |
| `DO_BOOLEEN` | `boolean` | Primitive boolean |
| `DO_DATE` | `LocalDate` | Date without time |
| `DO_DATE_HEURE` | `LocalDateTime` | Date + time |
| `DO_BIG_DECIMAL` | `BigDecimal` | Decimal number |
| `DO_LIST` | `List<{T}>` | Generic list |
| `DO_CRITERIA_STRING` | `String` | Search filter (string) |
| `DO_CRITERIA_NUMBER` | `Long` | Search filter (number) |
| `DO_QUERY_INPUT` | `QueryInputDto<{T}>` | Paginated search input |
| `DO_QUERY_OUTPUT` | `QueryOutputDto<{T}>` | Paginated search result |

---

### 2. `class:` — class definition

Used for entities, domain objects, DTOs, projections, and reference enums.

#### Entity (in `Data/`)

```yaml
class:
  name: MonObjetEntity
  sqlName: MON_OBJET               # DB table name: UPPER_SNAKE_CASE, French, singular
  trigram: MOB                     # 3-letter prefix for column names
  comment: "Entité MON_OBJET"
  extends: ParentEntity            # optional inheritance
  annotations:
    - NoArgsConstructor
    - AllArgsConstructor
    - SuperBuilder                 # use SuperBuilder when class is extended
  decorators:
    - StatutActif                  # adds est_actif column (soft-delete)
    - AuditableEntity              # adds created_at/updated_at/created_by/updated_by
  properties:
    - name: Id
      comment: Identifiant technique
      domain: DO_ID
      primaryKey: true
      required: true
    - name: Libelle
      comment: Libellé de l'objet
      domain: DO_LIBELLE
      required: true
      label: Libellé            # displayed label in UI
    - association: AutreEntity   # FK association — generates a JPA @ManyToOne
      comment: Référence vers AutreEntity
      required: true
    - association: AutreEntity   # association with a custom role (for self-refs or multiple FKs)
      role: AutreRole
      comment: Rôle alternatif
  unique:
    - [Libelle]                  # composite unique: [ColA, ColB]
```

**Column naming rule:** `<TRIGRAM>_<NOM_PROPRIETE>` in UPPER_SNAKE_CASE (generated automatically from trigram + property name).

#### Reference enum (in `Data/`)

```yaml
class:
  reference: true
  enum: true
  name: MonStatutEnum
  comment: Statut de mon objet
  decorators:
    - LibelleEnum
  properties:
    - name: Code
      comment: Code
      primaryKey: true
      domain: DO_CODE_ENUM
    - name: Libelle
      comment: Libellé
      required: true
      domain: DO_LIBELLE
  values:
    VALEUR_A: { Code: VALEUR_A, Libelle: Valeur A }
    VALEUR_B: { Code: VALEUR_B, Libelle: Valeur B }
```

#### Domain object (in `Domain/`)

The domain layer mirrors an entity but is independent of JPA. Map via `mappers`.

```yaml
class:
  name: MonObjet
  comment: Classe de domaine de mon objet
  annotations:
    - Data
    - Builder
    - AllArgsConstructor
    - NoArgsConstructor
  properties:
    - alias:
        class: MonObjetEntity         # copies ALL properties from the entity
        exclude:
          - PropAExclure              # optional: skip specific props
  mappers:
    from:
      - params:
          - class: MonObjetEntity     # generates MonObjet.from(MonObjetEntity)
    to:
      - class: MonObjetEntity         # generates entity.toMonObjetEntity()
```

#### DTO (in `Dto/`)

```yaml
class:
  name: MonObjetDto
  comment: DTO pour mon objet
  annotations:
    - Getter
    - Setter
    - Builder
    - NoArgsConstructor
    - AllArgsConstructor
  properties:
    - alias:
        class: MonObjet               # copies all domain props
        exclude:
          - PropTechnique
    - composition: AutreDto           # embeds another DTO as a property
      name: AutreObjet
      domain: DO_LIST                 # use DO_LIST for collections
      comment: Liste des objets liés
  mappers:
    from:
      - params:
          - class: MonObjet
```

#### Projection (in `Data/projection/`)

Read-only Spring Data projection interface.

```yaml
class:
  name: MonObjetProjection
  comment: Projection de mon objet
  abstract: true                     # generates a Java interface, not a class
  properties:
    - alias:
        class: MonObjetEntity
        include:
          - Id
          - Libelle
    - alias:
        class: AutreEntity
        include:
          - Code
      name: CodeAutre                # rename if there would be a name collision
```

---

### Property kinds

| Kind | When to use |
|---|---|
| Scalar (`name` + `domain`) | Simple typed field |
| `alias.class` (no `property`) | Copy all / include / exclude from another class |
| `alias.class` + `alias.property` | Copy a single named property |
| `association: ClassName` | FK / `@ManyToOne` reference |
| `composition: ClassName` + `name` + `domain` | Embedded object or list of objects |

```yaml
# Scalar
- name: DateDebut
  domain: DO_DATE
  required: true
  comment: Date de début

# Alias — copy all, excluding some
- alias:
    class: BeneficiaireEntity
    exclude:
      - PropAExclure

# Alias — copy a specific property (useful in endpoints)
- alias:
    class: BeneficiaireInfos
    property: Id

# Alias — copy a property, rename it
- alias:
    class: StatutEnum
    include:
      - Code
  name: Statut
  comment: Statut de l'objet

# Association
- association: EtablissementEntity
  comment: Établissement rattaché
  required: true

# Association with explicit role (avoids collisions)
- association: PersonneEntity
  role: PersonneParent
  comment: Personne parente

# Composition — embedded single object
- composition: AdresseDto
  name: Adresse
  comment: Adresse postale

# Composition — list of objects
- composition: EtablissementDto
  name: Etablissements
  domain: DO_LIST
  comment: Liste des établissements
```

---

### 3. `endpoint:` — REST API (in `Api/`)

```yaml
endpoint:
  name: RecupererMonObjet              # PascalCase verb + noun
  method: GET                          # GET | POST | PUT | DELETE | PATCH
  route: /api/mes-objets/{monObjetId}  # kebab-case, French, plural resources
  description: Récupération d'un objet
  tags:
    - autre-module-api                 # when exposed to another service
  annotations:
    - ApiInterne                       # restrict to internal callers
  params:
    # Path / query parameter
    - name: MonObjetId
      domain: DO_ID
      required: true
      comment: Identifiant de l'objet
    # Reuse property from a class (avoids duplication)
    - alias:
        class: MonObjetInfos
        property: Id
    # Request body (POST/PUT) — composition = body DTO
    - composition: MonObjetCreationDto
      name: monObjet
      comment: Données de création
  returns:
    # Scalar return
    name: monObjetId
    domain: DO_ID
    comment: Identifiant créé
    # Object return
    composition: MonObjetDto
    name: monObjet
    comment: L'objet récupéré
    required: true
    # List return
    composition: MonObjetDto
    domain: DO_LIST
    name: mesObjets
    comment: Liste des objets
    # Paginated return
    composition: MonObjetDto
    domain: DO_QUERY_OUTPUT
    name: page
    comment: Page de résultats
```

For paginated search endpoints, the input is `DO_QUERY_INPUT`:
```yaml
params:
  - composition: MonObjetRechercheCriteriaDto
    domain: DO_QUERY_INPUT
    name: query
    comment: Critères de recherche
```

---

### 4. `decorator:` — reusable property group

Defined in `<Module>/decorators.tmd` or `iris-model/decorators.tmd`.

```yaml
decorator:
  name: SituationEntity
  description: Champs communs des tables de situation
  properties:
    - name: DebutSituation
      domain: DO_DATE
      required: true
      comment: Date de début
    - name: FinSituation
      domain: DO_DATE
      comment: Date de fin
```

Apply a decorator on a class:
```yaml
class:
  name: MaSituationEntity
  decorators:
    - SituationEntity
  ...
```

---

### 5. `annotation:` — custom Java annotation

```yaml
annotation:
  name: MonAnnotation
  description: Applique mon annotation
  parameters:
    - name: Valeur
      required: true
      comment: La valeur
  java:
    - text: "@MonAnnotation(valeur = \"{Valeur}\")"
      imports:
        - com.example.MonAnnotation
      when: [persisted]    # optional: only on entity classes
```

---

## Naming conventions

| Concept | Pattern | Example |
|---|---|---|
| Entity | `NomEntity` | `BeneficiaireEntity` |
| Domain object | `Nom` | `Beneficiaire` |
| DTO | `NomDto` | `BeneficiaireResultatDto` |
| Criteria (domain) | `NomCriteria` | `BeneficiaireRechercheCriteria` |
| Criteria (DTO) | `NomCriteriaDto` | `BeneficiaireRechercheCriteriaDto` |
| Projection | `NomProjection` | `DemandeEnteteProjection` |
| Enum | `NomEnum` | `StatutFicheBeneficiaireEnum` |
| Endpoint file | `NomEndpoints.tmd` | `BeneficiairesEndpoints.tmd` |

Property names use PascalCase. `Id` is always the primary key name.
DB tables use UPPER_SNAKE_CASE, French, singular, no `ENTITY` suffix.
Columns are automatically prefixed with the entity's `trigram`.

---

## Checklist before writing a `.tmd`

1. **Identify the block type** — Entity? Domain? DTO? Endpoint? Enum?
2. **Check existing files** — does a related entity/domain already exist to alias from?
3. **Pick the right directory** — `Data/`, `Domain/`, `Dto/`, or `Api/`
4. **Set correct `uses:`** — every referenced class needs its path listed
5. **Set correct `tags:`** — match other files in the same layer
6. **Choose Lombok annotations** — Entity → `SuperBuilder` + `No/AllArgsConstructor`; Domain/DTO → `Data`/`Getter`/`Setter` + `Builder` + `No/AllArgsConstructor`
7. **Add `mappers:`** on domain objects and DTOs that need mapper generation
8. **Never modify `src/main/javagen/`** — it is regenerated from the model

---

## Complete example: adding a new entity + domain + DTO

**`iris-model/Acteur/Data/MonNouvelObjetEntity.tmd`**
```yaml
---
module: Acteur
uses:
  - decorators
  - decorators/lombok
  - Acteur/Data/BeneficiaireEntity
tags:
  - back-acteur
  - back-data-acteur
---
class:
  name: MonNouvelObjetEntity
  sqlName: MON_NOUVEL_OBJET
  trigram: MNO
  comment: "Entité MON_NOUVEL_OBJET"
  annotations:
    - NoArgsConstructor
    - AllArgsConstructor
    - SuperBuilder
  decorators:
    - StatutActif
    - AuditableEntity
  properties:
    - name: Id
      comment: Identifiant technique
      domain: DO_ID
      primaryKey: true
      required: true
    - name: Libelle
      comment: Libellé
      domain: DO_LIBELLE
      required: true
      label: Libellé
    - association: BeneficiaireEntity
      comment: Bénéficiaire associé
      required: true
```

**`iris-model/Acteur/Domain/MonNouvelObjet.tmd`**
```yaml
---
module: Acteur
uses:
  - decorators/lombok
  - Acteur/Data/MonNouvelObjetEntity
tags:
  - back-domain-acteur
---
class:
  name: MonNouvelObjet
  comment: Classe de domaine de mon nouvel objet
  annotations:
    - Data
    - Builder
    - AllArgsConstructor
    - NoArgsConstructor
  properties:
    - alias:
        class: MonNouvelObjetEntity
  mappers:
    from:
      - params:
          - class: MonNouvelObjetEntity
    to:
      - class: MonNouvelObjetEntity
```

**`iris-model/Acteur/Dto/MonNouvelObjetDto.tmd`**
```yaml
---
module: Acteur
uses:
  - decorators/lombok
  - Acteur/Domain/MonNouvelObjet
tags:
  - back-dto-acteur
  - front-acteur
---
class:
  name: MonNouvelObjetDto
  comment: DTO pour mon nouvel objet
  annotations:
    - Getter
    - Setter
    - Builder
    - NoArgsConstructor
    - AllArgsConstructor
  properties:
    - alias:
        class: MonNouvelObjet
  mappers:
    from:
      - params:
          - class: MonNouvelObjet
```

**`iris-model/Acteur/Api/MonNouvelObjetEndpoints.tmd`**
```yaml
---
module: Acteur
uses:
  - Acteur/Dto/MonNouvelObjetDto
  - decorators/commons
tags:
  - back-acteur
  - front-acteur
---
endpoint:
  name: RecupererMonNouvelObjet
  method: GET
  route: /api/mes-nouveaux-objets/{mnoId}
  description: Récupération d'un objet par son identifiant
  params:
    - name: mnoId
      domain: DO_ID
      required: true
      comment: Identifiant de l'objet
  returns:
    composition: MonNouvelObjetDto
    name: monNouvelObjet
    comment: L'objet récupéré
    required: true
```
