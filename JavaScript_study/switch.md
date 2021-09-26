# switch
- 조건문에서 비교해야 할 값이 많은 경우 if보다 switch문을 사용하여 가독성을 높인다.
    ex)
    switch (condition){
        case 'Oranges':
            console.log('Orange'); // condition의 값이 Oranges면 콘솔에 Orange를 띄운다
            break; // 함수가 실행된다면 멈춰달라는 명령. break가 없다면 맞더라도 그 다음 비교를 계속 함
        case 'Mangos':
            console.log('Mongo'); // condition의 값이 Mangos면 콘솔에 Mango를 띄운다
            break;
        case 'Charry':
            console.log('Charry'); // condition의 값이 Charry면 콘솔에 Charry를 띄운다
            break;
    }