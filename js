// 福利码列表
const codeList = [
    "CF6666",
    "BBCF18",
    "KCF18",
    "CFHUODONG888"
]

// 活动数据（修改这里新增活动，end为结束时间时间戳 https://timestamp.fun/ 转换）
const activityList = [
    {
        id:1,
        title:"7月藏宝阁英雄级抽奖活动",
        tag:["置顶","限时"],
        img:"https://picsum.photos/id/1/400/200",
        desc:"可抽取雷神、毁灭、云悠悠角色、永久限定皮肤，每日登录领抽奖币",
        end:1785772800, // 2026-08-02 00:00
        link:"#"
    },
    {
        id:2,
        title:"快手火线计划专属福利",
        tag:["渠道活动"],
        img:"https://picsum.photos/id/2/400/200",
        desc:"领取快手专属动力CPW-老铁限定，完成任务领积分兑换道具",
        end:1786636800, // 2026-08-12
        link:"#"
    },
    {
        id:3,
        title:"宋雨琦联动限定武器活动",
        tag:["绝版"],
        img:"https://picsum.photos/id/3/400/200",
        desc:"炽芒蝶刃宋雨琦皮肤限时领取，活动结束永久下架",
        end:1784822400, // 2026-07-27
        link:"#"
    }
]

// 渲染福利码
function renderCode(){
    const wrap = document.getElementById("codeWrap");
    let html = "";
    codeList.forEach(code=>{
        html += `<div class="code-item" onclick="copyCode('${code}')">${code}</div>`
    })
    wrap.innerHTML = html;
}

// 复制兑换码
function copyCode(code){
    navigator.clipboard.writeText(code).then(()=>{
        alert(`复制成功：${code}，前往游戏内兑换！`)
    })
}

// 倒计时计算
function getCountDown(endTime){
    const now = Math.floor(Date.now() / 1000);
    const diff = endTime - now;
    if(diff <= 0){
        return `<span class="count-end">活动已结束</span>`
    }
    const day = Math.floor(diff / 86400);
    const hour = Math.floor((diff % 86400) / 3600);
    const min = Math.floor((diff % 3600) / 60);
    const sec = diff % 60;
    return `剩余：${day}天 ${hour}时 ${min}分 ${sec}秒`
}

// 渲染活动列表
function renderAct(){
    const wrap = document.getElementById("actWrap");
    let html = "";
    activityList.forEach(act=>{
        let tagHtml = "";
        act.tag.forEach(t=>{
            if(t==="置顶") tagHtml += `<span class="tag tag-top">${t}</span>`
            else tagHtml += `<span class="tag tag-time">${t}</span>`
        })
        html += `
        <div class="act-card">
            <img class="act-img" src="${act.img}" alt="${act.title}">
            <div class="act-body">
                <div class="act-title">${act.title}</div>
                <div>${tagHtml}</div>
                <div class="countdown" data-end="${act.end}">${getCountDown(act.end)}</div>
                <div class="act-desc">${act.desc}</div>
                <a class="act-btn" href="${act.link}" target="_blank">前往活动</a>
            </div>
        </div>
        `
    })
    wrap.innerHTML = html;
}

// 每秒刷新所有倒计时
function refreshAllCount(){
    setInterval(()=>{
        document.querySelectorAll(".countdown").forEach(item=>{
            const end = Number(item.dataset.end)
            item.innerHTML = getCountDown(end)
        })
    }, 1000)
}

// 页面初始化
window.onload = function(){
    renderCode()
    renderAct()
    refreshAllCount()
}
