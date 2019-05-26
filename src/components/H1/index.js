import styled from 'styled-components';

const H1 = styled.h1`
  color: #3e465b;
  font-size: 35px;
  line-height: 1.5;
  margin: 0;
  padding: 0 30px;
  text-align: ${props => props.alignLeft ? "left" : "center"};
`;

export default H1;