function extractName(href) {
  const prefix = "_tsvdec_";
  const extension = "html";
  const prefixIndex = href.indexOf(prefix);
  const startIndex = href.indexOf(".", prefixIndex) + 1;
  const hrefWithoutParams = href.includes("?") ? href.substring(0, href.indexOf("?")) : href;
  const endIndex = hrefWithoutParams.length - extension.length - 1;
  return href.substring(startIndex, endIndex);
}

function getNavMap() {
  const navContainer = document.getElementById("tsd-nav-container");
  const navList = Array.from(navContainer.querySelectorAll("a"));
  return navList.reduce((out, elem) => ({ ...out, [elem.href]: elem }), {});
}

function getNameHrefMap() {
  const navMap = getNavMap();
  const hrefList = Object.keys(navMap);
  const nameHrefMap = hrefList.reduce((out, href) => ({ ...out, [extractName(href)]: href }), {});
  return nameHrefMap;
}

function search(query, nameHrefMap = getNameHrefMap()) {
  const lowercaseQuery = query.toLowerCase();
  const identifiers = Object.keys(nameHrefMap);
  const results = identifiers.filter(id => id.toLowerCase().includes(lowercaseQuery));
  return results.reduce((out, id) => ({ ...out, [id]: nameHrefMap[id] }), {});
}

function setShow(a, show) {
  const displayProp = show === true ? "flex" : "none";
  const svg = a.previousElementSibling;
  const isSvg = svg && svg.tagName.toLowerCase() === "svg";
  a.style.display = displayProp;
  if (isSvg) svg.style.display = displayProp;
}

function render(query) {
  const resultMap = search(query);
  const navMap = getNavMap();
  const navMapEntries = Object.entries(navMap);
  for (const [href, a] of navMapEntries) {
    const name = extractName(href);
    const url = new URL(href);
    url.searchParams.set("q", query);
    a.href = url.toString();
    const isMatch = name === "." || href === resultMap[name];
    setShow(a, isMatch);
  }
}

function configureSearchListener(searchInput) {
  searchInput.addEventListener("input", e => {
    const value = e.target.value;
    render(value);
  });
}

function getCurrentQuery() {
  const url = new URL(document.location.href);
  const query = url.searchParams.get("q") ?? "";
  return query;
}

function onDocumentLoad() {
  generateCustomSearchInput();
  render(getCurrentQuery());
}

function generateCustomSearchInput() {
  const mainLink = document.querySelector(".site-menu > nav > a");
  const customSearchInput = document.createElement("input");
  customSearchInput.type = "text";
  customSearchInput.placeholder = "Search";
  customSearchInput.value = getCurrentQuery();
  customSearchInput.classList.add("custom-search-input");
  configureSearchListener(customSearchInput);
  mainLink.replaceWith(customSearchInput);
}

window.onload = function () {
  onDocumentLoad();
};
