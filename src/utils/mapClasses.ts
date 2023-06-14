export default function mapClasses(style: object, ...classes: string[]) {
  return classes.reduce((acc: string[], el: string) => acc.concat((el || '').split(' ')),
    []
  )
  .map((className: string) => style[className as keyof object])
  .filter((x) => x)
  .join(' ');
}
