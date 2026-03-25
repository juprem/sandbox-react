import { useEffect } from 'react';

export function CrashTest() {
  useEffect(() => {
    console.log("parent1 effect");
  }, []);

  console.log("parent1 render");
  return (
    <div>
      <Child />
      <Sibling />
    </div>
  );
}

function Child() {
  useEffect(() => {
    console.log("child 1 effect");
  }, []);

  console.log("child 1 render");
  return (
    <Child2 />
  )
}

function Child2() {
  useEffect(() => {
    console.log("child 2 effect");
  }, []);

  console.log("child 2 render");
  return (
    <div />
  )
}

function Sibling() {
  useEffect(() => {
    console.log("sibling 1 effect");
  }, []);

  console.log("sibling 1 render");

  return <div>sibling 1 render</div>;
}


const statutDemandeList = allStatuts.filter((s) => {
  if (isJU && isDesadhesion) {
    return !statuts_excl_JU_desadhesion.has(s.code);
  }
});
