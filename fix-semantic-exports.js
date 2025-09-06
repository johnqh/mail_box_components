const fs = require('fs');

const filePath = '/Users/qianghuang/mail_box_components/src/components/SemanticHTML.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// Replace all remaining export const with const
content = content.replace(/^export const/gm, 'const');

// Replace the ending exports
content = content.replace(/export \{ Main \};\nexport default Main;/, `
export { 
  Main, Article, Section, Nav, Header, Footer, Aside, Figure,
  H1, H2, H3, H4, OrderedList, UnorderedList, Button, Link, SkipLink,
  SearchRegion, BannerRegion, ComplementaryRegion, Form, Input,
  ScreenReaderOnly, Loading,
  type SemanticSectionProps, type NavProps, type FigureProps,
  type HeadingProps, type ListProps, type ButtonProps, type LinkProps,
  type LandmarkProps, type FormProps, type InputProps, type LoadingProps
};
export default Main;`);

fs.writeFileSync(filePath, content);
console.log('Fixed SemanticHTML exports');