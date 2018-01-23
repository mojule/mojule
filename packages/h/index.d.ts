interface IAttributeMap {
  [ key: string ]: string | function
}

type ElementArg = string | Node | IAttributeMap

type FragmentArg = string | Node

interface IH {
  element: ( tagName: string, ...args: ElementArg[] ) => Element
  textNode: ( str: string ) => Text
  comment: ( str: string ) => Comment
  documentFragment: ( ...args: FragmentArg[] ) => DocumentFragment
  html: ( ...args: ElementArg[] ) => Element
  head: ( ...args: ElementArg[] ) => Element
  body: ( ...args: ElementArg[] ) => Element
  title: ( ...args: ElementArg[] ) => Element
  base: ( ...args: ElementArg[] ) => Element
  link: ( ...args: ElementArg[] ) => Element
  meta: ( ...args: ElementArg[] ) => Element
  style: ( ...args: ElementArg[] ) => Element
  address: ( ...args: ElementArg[] ) => Element
  article: ( ...args: ElementArg[] ) => Element
  aside: ( ...args: ElementArg[] ) => Element
  footer: ( ...args: ElementArg[] ) => Element
  header: ( ...args: ElementArg[] ) => Element
  h1: ( ...args: ElementArg[] ) => Element
  h2: ( ...args: ElementArg[] ) => Element
  h3: ( ...args: ElementArg[] ) => Element
  h4: ( ...args: ElementArg[] ) => Element
  h5: ( ...args: ElementArg[] ) => Element
  h6: ( ...args: ElementArg[] ) => Element
  nav: ( ...args: ElementArg[] ) => Element
  blockquote: ( ...args: ElementArg[] ) => Element
  dd: ( ...args: ElementArg[] ) => Element
  div: ( ...args: ElementArg[] ) => Element
  dl: ( ...args: ElementArg[] ) => Element
  dt: ( ...args: ElementArg[] ) => Element
  figcaption: ( ...args: ElementArg[] ) => Element
  figure: ( ...args: ElementArg[] ) => Element
  hr: ( ...args: ElementArg[] ) => Element
  li: ( ...args: ElementArg[] ) => Element
  main: ( ...args: ElementArg[] ) => Element
  ol: ( ...args: ElementArg[] ) => Element
  p: ( ...args: ElementArg[] ) => Element
  pre: ( ...args: ElementArg[] ) => Element
  section: ( ...args: ElementArg[] ) => Element
  ul: ( ...args: ElementArg[] ) => Element
  a: ( ...args: ElementArg[] ) => Element
  abbr: ( ...args: ElementArg[] ) => Element
  b: ( ...args: ElementArg[] ) => Element
  bdi: ( ...args: ElementArg[] ) => Element
  bdo: ( ...args: ElementArg[] ) => Element
  br: ( ...args: ElementArg[] ) => Element
  cite: ( ...args: ElementArg[] ) => Element
  code: ( ...args: ElementArg[] ) => Element
  data: ( ...args: ElementArg[] ) => Element
  dfn: ( ...args: ElementArg[] ) => Element
  em: ( ...args: ElementArg[] ) => Element
  i: ( ...args: ElementArg[] ) => Element
  kbd: ( ...args: ElementArg[] ) => Element
  mark: ( ...args: ElementArg[] ) => Element
  q: ( ...args: ElementArg[] ) => Element
  rp: ( ...args: ElementArg[] ) => Element
  rt: ( ...args: ElementArg[] ) => Element
  rtc: ( ...args: ElementArg[] ) => Element
  ruby: ( ...args: ElementArg[] ) => Element
  s: ( ...args: ElementArg[] ) => Element
  samp: ( ...args: ElementArg[] ) => Element
  small: ( ...args: ElementArg[] ) => Element
  span: ( ...args: ElementArg[] ) => Element
  strong: ( ...args: ElementArg[] ) => Element
  sub: ( ...args: ElementArg[] ) => Element
  sup: ( ...args: ElementArg[] ) => Element
  time: ( ...args: ElementArg[] ) => Element
  u: ( ...args: ElementArg[] ) => Element
  var: ( ...args: ElementArg[] ) => Element
  wbr: ( ...args: ElementArg[] ) => Element
  area: ( ...args: ElementArg[] ) => Element
  audio: ( ...args: ElementArg[] ) => Element
  map: ( ...args: ElementArg[] ) => Element
  track: ( ...args: ElementArg[] ) => Element
  video: ( ...args: ElementArg[] ) => Element
  embed: ( ...args: ElementArg[] ) => Element
  iframe: ( ...args: ElementArg[] ) => Element
  img: ( ...args: ElementArg[] ) => Element
  object: ( ...args: ElementArg[] ) => Element
  param: ( ...args: ElementArg[] ) => Element
  source: ( ...args: ElementArg[] ) => Element
  canvas: ( ...args: ElementArg[] ) => Element
  noscript: ( ...args: ElementArg[] ) => Element
  script: ( ...args: ElementArg[] ) => Element
  template: ( ...args: ElementArg[] ) => Element
  del: ( ...args: ElementArg[] ) => Element
  ins: ( ...args: ElementArg[] ) => Element
  caption: ( ...args: ElementArg[] ) => Element
  col: ( ...args: ElementArg[] ) => Element
  colgroup: ( ...args: ElementArg[] ) => Element
  table: ( ...args: ElementArg[] ) => Element
  tbody: ( ...args: ElementArg[] ) => Element
  td: ( ...args: ElementArg[] ) => Element
  tfoot: ( ...args: ElementArg[] ) => Element
  th: ( ...args: ElementArg[] ) => Element
  thead: ( ...args: ElementArg[] ) => Element
  tr: ( ...args: ElementArg[] ) => Element
  button: ( ...args: ElementArg[] ) => Element
  datalist: ( ...args: ElementArg[] ) => Element
  fieldset: ( ...args: ElementArg[] ) => Element
  form: ( ...args: ElementArg[] ) => Element
  input: ( ...args: ElementArg[] ) => Element
  label: ( ...args: ElementArg[] ) => Element
  legend: ( ...args: ElementArg[] ) => Element
  meter: ( ...args: ElementArg[] ) => Element
  optgroup: ( ...args: ElementArg[] ) => Element
  option: ( ...args: ElementArg[] ) => Element
  output: ( ...args: ElementArg[] ) => Element
  progress: ( ...args: ElementArg[] ) => Element
  select: ( ...args: ElementArg[] ) => Element
  textarea: ( ...args: ElementArg[] ) => Element
  details: ( ...args: ElementArg[] ) => Element
  dialog: ( ...args: ElementArg[] ) => Element
  hgroup: ( ...args: ElementArg[] ) => Element
  menu: ( ...args: ElementArg[] ) => Element
  menuitem: ( ...args: ElementArg[] ) => Element
  picture: ( ...args: ElementArg[] ) => Element
  shadow: ( ...args: ElementArg[] ) => Element
  summary: ( ...args: ElementArg[] ) => Element
}

type HFactory = ( document: HTMLDocument ) => IH

//export const H : HFactory

declare const H: HFactory

export = H
