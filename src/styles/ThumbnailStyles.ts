import styled from 'styled-components';

export const Container = styled.button`
    background-color: rgb(60, 26, 17);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px;
    border-radius: 84px;
    width: 100px;
    height: 100px;
    margin: 7px;
    outline: none;
    cursor: pointer;

    &:focus {
        padding: 22px;
    }
`;

export const Ingredient = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
`;

export const CoffeeCup = styled.div`
    width: 40px;
    height: 56px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 5px;
    position: relative;
`;