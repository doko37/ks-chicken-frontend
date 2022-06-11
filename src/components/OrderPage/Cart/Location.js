import React from 'react'
import styled from 'styled-components'
import { AccessTime, PinDrop } from '@material-ui/icons'

const Ctn = styled.div`
    height: auto;
    background-color: white;
`

const Wrapper = styled.div`
    margin: 0 1rem;
    text-align: left;
    padding: 0.5rem 0;
`

const SectionCtn = styled.div`
    display: flex;
    align-items: center;
    margin: 0.5rem 0;
`

const Text = styled.p`
    margin: 0;
    margin-left: 0.5rem;
    font-size: 14px;
`

export default function Location() {
  return (
      <Ctn>
          <Wrapper>
              <SectionCtn>
                  <AccessTime />
                  <Text>April 5th, 3:15PM</Text>
              </SectionCtn>
              <SectionCtn>
                  <PinDrop />
                  <div>
                    <Text>Rosedale Store</Text>
                    <Text>33b Triton Drive, Rosedale, Auckland, NZ</Text>
                  </div>
              </SectionCtn>
          </Wrapper>
      </Ctn>
  )
}
