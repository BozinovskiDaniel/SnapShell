/* eslint-disable react/no-unescaped-entities */

// sections for home page
import SectionOne from './home-page/SectionOne';
import SectionTwo from './home-page/SectionTwo';
import SectionThree from './home-page/SectionThree';

const HOME_PAGE_SECTIONS = [
  {
    name: 'Section one',
    component: <SectionOne />,
  },
  {
    name: 'Section two',
    component: <SectionTwo />,
    className: 'bg-slate-100 py-24',
  },
  {
    name: 'Section three',
    component: <SectionThree />,
  },
];

export default function Home() {
  return (
    <div className="grainy-light">
      {HOME_PAGE_SECTIONS.map((section) => (
        <section key={section.name} className={section.className}>
          {section.component}
        </section>
      ))}
    </div>
  );
}
