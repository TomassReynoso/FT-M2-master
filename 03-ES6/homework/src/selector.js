var traverseDomAndCollectElements = function (matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ

  if (matchFunc(startEl)) resultSet.push(startEl);
  for (let i = 0; i < startEl.children.length; i++) {
    let result = traverseDomAndCollectElements(matchFunc, startEl.children[i]);
    resultSet = [...resultSet, ...result];
  }
  return resultSet;

  // if (matchFunc(startEl)) resultSet.push(startEl);
  // for (var el of startEl.children) {
  //   resultSet = resultSet.concat(traverseDomAndCollectElements(matchFunc, el))         // ALTERNATIVA
  // }
  // return resultSet;

};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function (selector) {
  // tu código aquí

  if (selector[0] === "#") return "id";
  if (selector[0] === ".") return "class";
  if (selector.includes(".")) return "tag.class";
  return "tag";

};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function (selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = (element) => "#" + element.id === selector;
    // matchFunction = (el) => `#${el.id}` === selector;  // ALTERNATIVA
  } else if (selectorType === "class") {
    matchFunction = (element) => {
      for (const cls of element.classList) {
        if ("." + cls === selector) return true;
      }
      return false;
    };
    // matchFunction = (el) => el.classList.contains(selector.substring(1));   // ALTERNATIVA
  } else if (selectorType === "tag.class") {
    matchFunction = (element) => {
      const [miTag, miClass] = selector.split(".");
      return (
        matchFunctionMaker(miTag)(element) &&
        matchFunctionMaker("." + miClass)(element)
      );
    };
    // matchFunction = (el) => {
    //   const [tag, className] = selector.split(`.`);
    //   return (el.classList.contains(className) &&                  // ALTERNATIVA
    //     el.tagName.toLowerCase() === tag.toLowerCase()
    //   );
    // };
  } else if (selectorType === "tag") {
    matchFunction = (element) => {
      if (element.tagName.toLowerCase() === selector) return true;
      return false;
    };
    // matchFunction = (el) => el.tagName.toLowerCase() === selector.toLowerCase();       // ALTERNATIVA
  }
  return matchFunction;
};

var $ = function (selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
