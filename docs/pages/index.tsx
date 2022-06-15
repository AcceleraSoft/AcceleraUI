import type { NextPage } from 'next'

import Page from "../components/Page"

import { Button, Heading } from "gearsui"
import Link from 'next/link';

const components = [
  { name: 'button', title: 'Button' },
  { name: 'heading', title: 'Heading' },
];

const Home: NextPage = () => {
  return (
    <Page title="GearsUI">
      <Heading>The new standard for building highly interactive applications</Heading>
      <Button primary>Learn more</Button>
      {components.map(comp => <Link key={comp.name} href={`/component/${comp.name}`}><a>{comp.title}</a></Link>)}
    </Page>
  )
}

export default Home
