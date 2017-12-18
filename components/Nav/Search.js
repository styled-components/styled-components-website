import styled from 'styled-components'

import rem from '../../utils/rem'
import { navbarHeight } from '../../utils/sizes'
import { resetInput } from '../../utils/form'
import { SearchIcon } from './NavIcons'

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 0 0 auto;
  margin-right: ${rem(10)};
`

const Input = styled.input`
  ${resetInput}

  flex: 0 0 auto;
  width: ${rem(200)};
  padding: 0 ${rem(5)};
  line-height: ${rem(navbarHeight - 20)};
  font-size: ${rem(15)};
  color: currentColor;
  transition: background 100ms ease-in;

  ::placeholder {
    color: currentColor;
    opacity: 0.5;
  }

  &:focus {
    background: rgba(0, 0, 0, 0.07);
    border-radius: 3px;
  }
`

const Label = styled.label`
  text-indent: -99999px;
`

const HiddenLabelText = styled.span`
  position: absolute;
`

const SearchIconWrapper = styled.div`
  svg {
    width: ${rem(16)};
    height: ${rem(17)};
    margin-right: ${rem(5)};
    display: block;

    path {
      fill: currentColor;
    }
  }
`

const SearchIconWithLabel = () => (
  <Label htmlFor="docs-search-input">
    <HiddenLabelText>Search</HiddenLabelText>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
  </Label>
)

const Search = ({ isDocs }) => (
  <Wrapper>
    <SearchIconWithLabel />
    <Input
      placeholder={isDocs ? `Search ...` : `Search docs ...`}
      id="docs-search-input"
    />
  </Wrapper>
)

export default Search
