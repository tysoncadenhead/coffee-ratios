import styled from 'styled-components';

export const CoffeeName = styled.div`
    font-family: Roboto;
    color: #FFFFFF;
    font-size: 22px;
    text-transform: uppercase;
    padding-bottom: 24px;
`;

export const CoffeeDescription = styled.div`
    font-family: Roboto;
    color: rgb(36, 15, 4);
    font-size: 12px;
    padding-top: 24px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 52px;
`;

export const Ingredient = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Roboto;
    font-size: 14px;
`;

export const CoffeeCup = styled.div`
    width: 200px;
    height: 350px;
    background-color: #EEEEEE;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 18px;
    position: relative;
`;

export const CupHandle = styled.div`
    position: absolute;
    right: -54px;
    border-width: 29px;
    border-color: #EEEEEE;
    border-style: solid;
    border-radius: 27px;
    z-index: -1;
    top: 100px;
    height: 150px;
    width: 40px;
`;