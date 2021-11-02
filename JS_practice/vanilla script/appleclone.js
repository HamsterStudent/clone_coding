(()=>{

    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA_:document.querySelector('#scroll-section-0 .main-message.a'),
                messageB_:document.querySelector('#scroll-section-0 .main-message.b'),
                messageC_:document.querySelector('#scroll-section-0 .main-message.c'),
                messageD_:document.querySelector('#scroll-section-0 .main-message.d')
            }
        },
        {
            //1
            type: 'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3')
            }
        },
    ];

    function setLayout(){
        for(let i =0; i<sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`
        }
        //새로고침해도 스크롤 섹션이 그 위치에 있게
        yOffset = window.pageYOffset;
        let totalScrollheight = 0;
        for(let i =0 ; i < sceneInfo.length; i++){
            totalScrollheight = totalScrollheight + sceneInfo[i].scrollHeight;
            if(totalScrollheight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`)
    }

    function scrollLoop(){
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            currentScene++;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight){
            currentScene--;
            document.body.setAttribute('id', `show-scene-${currentScene}`);
        }
        
        playAnimation();
    }

    function calcValues(values, currentYOffset){
        let rv;
        let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
        rv = scrollRatio * (values[1] - values[0]) + values[0]
        return rv;
    }


    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;

        switch(currentScene){
            case 0:
                let messageA_opacity_in = calcValues(values.messageA_opacity, currentYOffset)
                objs.messageA_.style.opacity = messageA_opacity_in;
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }
    }


    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);


})


(() => {

    let yOffset = 0;
    let prevScrollHeight = 0;
    let currentScene = 0;
    let enterNewScene = false;

    const sceneInfo = [
        {
            //0
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
            },
            values: {
                messageA_opacity_in: [0, 1, {start:0.1, end:0.2}]
            }
        },
        {
            //1
            type:'normal',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-1')
            }
        },
        {
            //2
            type:'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-2')
            }
        },
        {
            //1
            type:'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs:{
                container: document.querySelector('#scroll-section-3')
            }
        },
    ];

    function setLayout(){
        for (let i=0; i<sceneInfo.length; i++){
            sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollheight = 0;
        for(let i = 0; i < sceneInfo.length; i++){
            totalScrollheight += sceneInfo[i].scrollHeight;
            if(totalScrollheight >= yOffset){
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    function scrollLoop(){
        enterNewScene = false;
        prevScrollHeight = 0;
        for(let i = 0; i < currentScene; i++){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight){
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `shoq-scene-${currentScene}`);
        }
        if (yOffset < prevScrollHeight){
            enterNewScene = true;
            if(currentScene === 0) return
            currentScene--;
            document.body.setAttribute('id', `shoq-scene-${currentScene}`);
        }

        if(enterNewScene) return;
        playAnimation();
        
    }

    function calcValues(values, currentYOffset){
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3){
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0] + values[0]);
            } else if ( currentYOffset < partScrollStart){
                rv = values[0];
            } else if (currentYOffset > partScrollEnd){
                rv = values[1]
            }
        }else {
            rv = scrollRatio * (values[1] - values[0])+ values[0];
        }
        return rv;
    }

    function playAnimation(){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const csrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight;

        switch (currentScene) {
            case 0:
                const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);

                if(scrollRatio <= 0.22){
                    objs.messageA.style.opacity = messageA_opacity_in;
                }else{
                    objs.messageA.style/opacity = messageA_opacity_out;
                }
                break;
            
                
            case 1:
                break;
            case 2: 
                break;
            case 3:
                break;   
        }
    }

    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        scrollLoop();
    })

    window.addEventListener('load', setLayout)
    window.addEventListener('resize', setLayout)


})