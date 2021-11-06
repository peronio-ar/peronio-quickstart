import styled from 'styled-components';
// SM - Side Menu
// PT - page header
// PD - Page description
// FC - Feature Card
// I  - inpout
// SB - Submit button
// F  - footer
// RC - Right content
// LC - Left content
// MC - Main content
// St - Settings
const Grid = styled.div`
  display: grid;

  grid-template-columns: 96px 328px auto 328px;
  grid-template-rows: 96px 160px 160px 160px 160px 96px;

  grid-template-areas:
    'SM PH PD RC'
    'SM LC FC RC'
    'SM LC I  RC'
    'SM LC I  RC'
    'SM LC SB RC'
    'ST F  F  F'
    ;

    height: 100vh;
`;