import type { NextPage } from 'next'

import Page from "../components/Page"

import { Button, Heading } from "gearsui"
import styled from '@emotion/styled'
import Link from 'next/link'

const Hero = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: auto;
max-width: 50rem;
min-height: 100vh;
`

const Home: NextPage = () => {
  return (
    <Page title="GearsUI" sidebar={false}>
      <Hero>
        <div style={{ textAlign: 'center' }}>
          <Heading>The new standard for building highly interactive applications</Heading>
          <Button primary render={props => <Link href="/docs"><a {...props}></a></Link>}>Learn more</Button>
        </div>
      </Hero>
    </Page>
  )
}

export default Home
