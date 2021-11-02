// (function() {})(); 와 같은 형태
// 이렇게 하는 이유? : 전역변수 사용을 피하려고 / 이름간 충돌이 발생할 수 있음 / 자바스크립트 자체에서 전역변수 사용은 바람직하지 않음
(() => {

    let yOffset = 0;  //window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
    let currentScene = 0; //현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; //새로운 씬이 시작되는 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky', //스크롤에 반응해서 동작하는 구간에 sticky사용
            heightNum: 5, //브라우저 높이의 5배로 scrollHeight 세팅( 서로 다른 기기에 전부 대응하기 위해 )
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d')
            },
            values: {
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }], //스크롤 높이를 1로 두었을 때 그것의 비를 설정한 것
                // messageB_opacity_in: [0, 1,  { start: 0.3, end: 0.4}],
                messageA_translateY_in: [20, 0, {start: 0.1, end: 0.2}],

                messageA_opacity_out: [1, 0,  {start: 0.25, end: 0.3}],
                messageA_translateY_out: [0, -20,  {start: 0.25, end: 0.3}],
            }
        },
        {
            // 1
            type: 'normal',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5, 
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        }
    ];

    function setLayout() {
        //각 스크롤 섹션의 높이 세팅
        for ( let i = 0; i < sceneInfo.length; i++) {

            //타입에 따라 스크롤 높이 세팅
            if (sceneInfo[i].type === 'sticky'){
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            }else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;

            
        }

        //새로고침해도 스크롤 섹션이 그 위치에 있게 세팅
        yOffset = window.pageYOffset;
        let totalScrollheight = 0;
        for(let i = 0; i < sceneInfo.length; i++){
            totalScrollheight += sceneInfo[i].scrollHeight;
            if(totalScrollheight >=  yOffset){
                currentScene = i;
                break;
            }
        }
        //스크롤 될 때 id값을 show-scene-현재색션값 으로 설정
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    
    function scrollLoop(){ //애니메이션 활성화시킬 씬이 몇번째 씬인지 알아내는 함수
        enterNewScene = false;
        prevScrollHeight = 0; //scrollHeight의 값 누적을 막기 위해
        for(let i = 0; i < currentScene; i++) {
            // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        //스크롤이 일정 크기 이상이면 다음 씬으로 넘어감
        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true; 
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        //스크롤이 일정 크기 이하라면 이전 씬으로 넘어감
        if(yOffset < prevScrollHeight) {
            enterNewScene = true;
            if(currentScene === 0) return //스크롤시 브라우저 바운스 효과로 인해 마이너스 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        // console.log(currentScene)

        if(enterNewScene) return;
        playAnimation();
    }

    function calcValues(values, currentYOffset){
        let rv;
        //현재 씬(스크롤 섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
				rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
			} else if (currentYOffset < partScrollStart) {
				rv = values[0];
			} else if (currentYOffset > partScrollEnd) {
				rv = values[1];
			}
		} else {
			rv = scrollRatio * (values[1] - values[0]) + values[0];
		}

        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight; //현재 씬의 scrollHeight

        // console.log(currentScene);

        // console.log( currentScene, currentYOffset);

        switch (currentScene) {
            case 0:
                // console.log('0 play');
                // 메시지 투명도 조절
                if(scrollRatio <= 0.22){
                    //in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_in, currentYOffset)}%)`;
                } else {
                    //out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translateY(${calcValues(values.messageA_translateY_out, currentYOffset)}%)`;

                }
                console.log(messageA_opacity_in);
                break;

            case 1:
                // console.log('1 play');
                break;
            case 2:
                // console.log('2 play');
                break;
            case 3:
                // console.log('3 play');
                break;
        }
    }

    

    window.addEventListener( 'scroll', ()=> { //스크롤은 복잡하게 동작하기 때문에 여러 함수 사용
        yOffset = window.pageYOffset;
        scrollLoop();

    });
    
    window.addEventListener('load', setLayout);
    window.addEventListener( 'resize', setLayout )


})();