
# 스코프(scope)
- 함수가 실행될 때, 함수 내에서 변수에 대한 접근이 어떻게 되는지를 나타내는 용어이다. 즉, 스코프란 '변수에 접근할 수 있는 범위'
- 전역(global)과 지역(local) 이 두 가지의 타입이 있다.
    + 전역 스코프 : 어느 곳에서든 해당 변수에 접근할 수 있음
    + 지역 스코프 : 해당 지역에서만 접근할 수 있음. 해당 지역을 벗어나면 접근 불가.
        - 함수 몸체에 선언한 변수가 해당 함수 몸체 안에서만 접근 가능한 것을 함수 스코프라고 하며, 이는 지역 스코프이다.
        - 중괄호로 둘러싸인 블록 스코프 또한 지역 스코프
- 자바스크립트에서는 함수를 선언할 때 마다 새로운 스코프를 생성한다.
    ex)

    var a = 1; // 전역 스코프

    function print(){ // 지역(함수)스코프
        var a = 123;
        console.log(a)
    }

    print(); // 123 나옴

    console.log(a) // 1 나옴