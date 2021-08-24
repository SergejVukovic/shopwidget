import styled from "styled-components";

const Select = styled.select`
    height: 35px;
    background-color: rgb(0,158,127);
    color: #fff;
    border: none;
    font-weight: 600;
    width: 90%;
    border-radius: 32px;
    padding: 8px;
    margin: 5px;
    @media (min-width: 992px) {
        width: 40%;
    }
`;

export default Select;
