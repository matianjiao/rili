window.onload=function(){
	// var ajax=function(o){
	// 	var req=new XMLHttpRequest();
	// 	req.open('get',o.url);
	// 	req.send();
	// 	req.onreadystatechange=function(){
	// 		if(this.readyState==this.DONE && this.status==200){
	// 			o.onsuccess(this.response);
	// 		}
	// 	}
	// };
// 点击换图片
	var tu=document.getElementsByClassName('tu');
	var tupian=document.getElementById('tupian');
	var datestring=function(){
		// var today=new Date(date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate());
		return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate();
	};
	// var qingqiu=function(){
	// 	// 参数为对象调用ajax这个函数
	// 	ajax({
	// 		url:'http://localhost/aaa?time='+datestring(),
	// 		onsuccess:function(data){
	// 			tupian.innerHTML='';
	// 			tupian.style.display='none';
	// 			if(data!='none'){
	// 				res=JSON.parse(data);
	// 				for (var i = 0; i <res.length; i++) {
	// 					el=document.createElement('div');
	// 					el.setAttribute('class','tu');
	// 					img=document.createElement('img');
	// 					img.style.width='100%';
	// 					img.style.height='100%';
	// 					img.style.borderRadius='20px';
	// 					img.src='image/'+res[i];
	// 					tupian.style.display='block';
	// 					el.appendChild(img);
	// 					tupian.appendChild(el);	
	// 				}
	// 			}
	// 			for(var i=0;i<tu.length;i++){
	// 				tu[i].onclick=function(){
	// 					fangda.style.display='block';
	// 					xianshi.innerHTML=this.innerHTML;
	// 				}
	// 			}
	// 			var close=document.getElementById('close');
	// 			close.onclick=function(){
	// 				fangda.style.display='none';
	// 			}
				
	// 		}
	// 	})
		
	// };


// 画线
	for (var i = 1; i <=24; i++) {
		var heixian=document.createElement('div');
		heixian.setAttribute('class','heixian');
		heixian.style.top=i*50+'px'
		shijianzhou.appendChild(heixian);
		var shijian=document.createElement('div');
		shijian.innerHTML=i;
		shijian.style.position='absolute';
		shijian.style.top='-10px';
		shijian.style.left='-20px';
		shijian.style.color='#A7A7A7';
		shijian.style.fontSize='14px';
		shijian.style.fontWeight='bold';
		heixian.appendChild(shijian);

		var huixian=document.createElement('div');
		huixian.setAttribute('class','huixian');
		huixian.style.top=(i-1)*50+25+'px'
		shijianzhou.appendChild(huixian);
	};


	var date=new Date();
	var yy=date.getFullYear();
	var mm=date.getMonth();
	var dd=date.getDate();
	var meiyuetianshu=[31,28,31,30,31,30,31,31,30,31,30,31];

// 二月天数
	if(date.getFullYear()%100!=0&& date.getFullYear()%4==0||date.getFullYear()%400==0){
		meiyuetianshu[1]=29;
	}else{
		meiyuetianshu[1]=28;
	}
// 添加class
	addClass=function(el,s){
		var tmp=el.getAttribute('class').split(' ');
		var dict={};
		for(var i=0;i<tmp.length;i++){
			dict[tmp[i]]=true;
		}
		if(!dict[s]){
			el.setAttribute('class',el.getAttribute('class')+' '+s);
		}
	};
// 删除class
	removeClass=function(el,s){
	
		var tmp=el.getAttribute('class').split(' ');
		var dict={};
		for(var i=0;i<tmp.length;i++){
			dict[tmp[i]]=true;
		}
		delete dict[s];
	
		var ns='';
		for(var name in dict){
			ns+=' '+name;	
		}
		el.setAttribute('class',ns);
	};
// 是否为闰年
	var isrunnian=function(year){
		if(year%4==0 && year%100!=0 || year%400==0){
			return true;
		}else{
			return false;
		}
	};
// 前一天
	var currentyear,currentmonth,currentdate;
	var targetyear,targetmonth,targetdate;
	var previousDay=function(){
		currentyear=date.getFullYear();
		currentmonth=date.getMonth();
		currentdate=date.getDate();
		targetdate=currentdate-1;
		if(targetdate==0){
			targetmonth=currentmonth-1;
			targetyear=currentyear;
			if(targetmonth==-1){
				targetyear=currentyear-1;
				targetmonth=11;
			}
			targetdate=meiyuetianshu[targetmonth];
		}else{
			targetyear=currentyear;
			targetmonth=currentmonth;
		}
		if(isrunnian(targetyear)){
			meiyuetianshu[1]=29;
		}
		// console.log(targetyear,targetmonth+1,targetdate);
		date=new Date(targetyear,targetmonth,targetdate);
	};
// 后一天
	var nextDay=function(){
		currentyear=date.getFullYear();
		currentmonth=date.getMonth();
		currentdate=date.getDate();
		targetdate=currentdate+1;
		if(targetdate==meiyuetianshu[currentmonth]+1){
			targetmonth=currentmonth+1;
			targetyear=currentyear;
			if(targetmonth==12){
				targetyear=currentyear+1;
				targetmonth=0;
			}
			targetdate=1;

		}else{
			targetyear=currentyear;
			targetmonth=currentmonth;
		}
		// 设置好时间后判断2月份具体天数
		if(isrunnian(targetyear)){//二月  且  为闰年
			meiyuetianshu[1]=29;
		}

		date=new Date(targetyear,targetmonth,targetdate);
	};

	var cc=['日','一','二','三','四','五','六'];
	var shangyige;
// 时间改变--强大的函数
	var ondatechange=function(){
		// console.log(shangyige);
		if(shangyige){	
			removeClass(shangyige,'dianba');
		}

		var xx=date.getDate();
		var el=document.getElementById('d'+xx);
		addClass(el,'dianba');
		shangyige=el;
		//当天的字体颜色为红色 huarili中设置了shangyige=null 所以这是针对画日历写的

		if(date.getMonth()==mm && date.getFullYear()==yy &&date.getDate()!=dd){//本月
			document.getElementById('d'+dd).style.color='#FF3B30';
			removeClass(document.getElementById('d'+dd),'dangtian');
			// removeClass(document.getElementById('d'+dd),'dangtianhover');
			// 只要日期改变 不是今天 前往今天 颜色就变
			back.style.color='#ff3b30';	
			addClass(document.getElementById('d'+dd),'dangtianhover');
		
		}
		else if(date.getMonth()==mm && date.getFullYear()==yy && date.getDate()==dd){//本天
			removeClass(document.getElementById('d'+dd),'dangtianhover');
			addClass(document.getElementById('d'+dd),'dangtian');
			// 只要日期改变 是今天 前往今天 颜色就变
			back.style.color='#D6D6D5';	
		}else{
			removeClass(document.getElementById('d'+dd),'dangtianhover');
			// 只要日期改变 不是今天 前往今天 颜色就变
			back.style.color='#ff3b30';	
		}

		if(date.getDate()<10){
			timeri.innerHTML='0'+date.getDate();
			yearMS.innerHTML=date.getFullYear()+' '+'年'+' '+Number(date.getMonth()+1)+' '+'月'+' '+'0'+date.getDate()+' '+'日';				
			datezuo.innerHTML=date.getFullYear()+' '+'年'+' '+Number(date.getMonth()+1)+' '+'月'+' '+'0'+date.getDate()+' '+'日星期'+cc[date.getDay()];							
		}else{
			timeri.innerHTML=date.getDate();
			yearMS.innerHTML=date.getFullYear()+' '+'年'+' '+Number(date.getMonth()+1)+' '+'月'+' '+date.getDate()+' '+'日';				
			datezuo.innerHTML=date.getFullYear()+' '+'年'+' '+Number(date.getMonth()+1)+' '+'月'+' '+date.getDate()+' '+'日星期'+cc[date.getDay()];		
		}

		zhou.innerHTML='星期'+cc[date.getDay()];
		// qingqiu();

		// 右边灰色部分
		var xingqi=date.getDay();
		if(date.getFullYear()==yy && date.getMonth()==mm && date.getDate()==dd){
			// 当天
			zhezhao.style.display='none';
			nowtime.style.display='block';
			clearInterval(showt);
			showt=setInterval(showfn,100);
		}else if( xingqi==6 ||xingqi==0 ){
			// 周末
			zhezhao.style.display='block';
			nowtime.style.display='none';
			clearInterval(showt);
		}else if( xingqi!=6 ||xingqi!=0 ){		
			// 不是周末
			zhezhao.style.display='none';
			clearInterval(showt);
			nowtime.style.display='none';
		}

	};
// 左键
	document.onmousedown=function(e){
		e.preventDefault();
	};
	hongzuo.onclick=function(){
		previousDay();//调用函数改变它的日期
		huarili();
		ondatechange();//这个函数专门用来根据日期更新页面显示
	};
// 右键
	hongyou.onclick=function(){
		nextDay();
		huarili();//shangyige==null,今天的日期颜色不会变为红色
		ondatechange();
	};


// 画日历
	var hao=document.getElementsByClassName('hao');
	var huarili=function(){
		// shangyige=null;
		var i=0;
	 // 画前一个月
	
		var tmp=date.getDate();//获取当前时间
		date.setDate(1);//获取1号星期几
		var xingqi=date.getDay();
		date.setDate(tmp);//还原时间
		var L=(xingqi==0)?6:xingqi-1;
		if(date.getMonth()-1==-1){//如果为一月date.getMonth()-1 为-1	
			var shangyiyue=31
		}else{
			var shangyiyue=meiyuetianshu[date.getMonth()-1];
		}
		for(;i<L;i++){
			hao[i].innerHTML=shangyiyue-(L-i-1);
			hao[i].style.color='#ccc';
			hao[i].setAttribute('pr',true);
			hao[i].removeAttribute('nx');
			hao[i].removeAttribute('id');

			removeClass(hao[i],'dangtian');
			removeClass(hao[i],'dangtianhover');
			removeClass(hao[i],'dianba');
		}

	 // 画当月的		
		for(;i<meiyuetianshu[date.getMonth()]+L;i++){
			hao[i].innerHTML=i-L+1;
			hao[i].setAttribute('id','d'+(i-L+1));
			hao[i].removeAttribute('nx');
			hao[i].removeAttribute('pr');
			hao[i].style.color='black';
			removeClass(hao[i],'dangtian');
			removeClass(hao[i],'dangtianhover');
			removeClass(hao[i],'dianba');
		}
	 // 画下一个月
		var D=i;
		for (; i < 42; i++) {
			hao[i].innerHTML=i-D+1;
			hao[i].style.color='#ccc';
			hao[i].setAttribute('nx',true);
			hao[i].removeAttribute('id');
			hao[i].removeAttribute('pr');
			removeClass(hao[i],'dangtianhover');
		    removeClass(hao[i],'dangtian');
		    removeClass(hao[i],'dianba');
		};
		
		if(42-D>=7){ //最后一行有多余
			for(var j=0;j<7;j++){
				hao[hao.length-1-j].style.display='none';
			}	
			for(var k=0;k<35;k++){
				hao[k].style.height='32.5px';
				hao[k].style.lineHeight='32.5px';
			}			
		}else if(42-D<7){
			for(var jj=0;jj<7;jj++){
				hao[hao.length-1-jj].style.display='block';
			}	
			for(var k=0;k<35;k++){
				hao[k].style.height='27px';
				hao[k].style.lineHeight='27px';
			}			
		}

	};
	huarili();

// //刷新时显示当天日期  写在画日历的那时间在改变
	 for(var i=0;i<hao.length;i++){
	 	if(hao[i].innerHTML==date.getDate() && hao[i].hasAttribute('id')){
	 		addClass(hao[i],'dangtian');
	 	}
	 }


// 点击选日期
	for (var i = 0; i < hao.length; i++) {
		hao[i].onmouseover=function(){
				addClass(this,'haohover');
			};
		hao[i].onmouseout=function(){
				removeClass(this,'haohover');
			};
		// 防止冒泡
		hao[i].onclick=function(e){
			e.stopPropagation();
		};
		hao[i].onclick=function(){		
		// 当天颜色	
			var a=date.getFullYear();
			var b=date.getMonth();
			var c=date.getDate();
			var x,y,z;
			if(this.hasAttribute('id')){
				date.setDate(this.innerHTML);
				ondatechange();
				
			}else if(this.hasAttribute('nx')){
			// 根据a,b,c,得到正确的x,y,z
				if(b==11){
					x=a+1;
					if(isrunnian(x)){
						meiyuetianshu[1]=29;
					}else{
						meiyuetianshu[1]=28;
					}
					y=0;
					z=this.innerHTML;
				}else{
					x=a;
					y=b+1;
					z=this.innerHTML;
				}
				date=new Date(x,y,z);
				huarili();
				ondatechange();
			}else if(this.hasAttribute('pr')){
			// 根据a,b,c,得到正确的x,y,z
				if(b==0){
					x=a-1;
					if(isrunnian(x)){
						meiyuetianshu[1]=29;
					}else{
						meiyuetianshu[1]=28;
					}
					y=11;
					z=this.innerHTML;
				}else{
					x=a;
					y=b-1;
					z=this.innerHTML;
				}
				date=new Date(x,y,z);
				huarili();
				ondatechange();
			}

		};
	};
// 红线
	var showt=setInterval(showfn,100);
	var showfn=function(){
		var noww=new Date();
		var changtime=noww.getTime();
		var ddd=new Date(date.getFullYear(),date.getMonth(),date.getDate(),0,0,0);
		var duantime=ddd.getTime();//1970到今天凌晨时间

		nowtime.style.top=(changtime-duantime)/(24*60*60*1000)*1200+'px';
		if(noww.getHours()<=9 && noww.getMinutes()<=9){
			second.innerHTML='0'+noww.getHours()+':'+'0'+noww.getMinutes();
		}else if(noww.getHours()<=9 && noww.getMinutes()>9){
			second.innerHTML='0'+noww.getHours()+':'+noww.getMinutes();
		}else if(noww.getHours()>9 && noww.getMinutes()>9){
			second.innerHTML=noww.getHours()+':'+noww.getMinutes();
		}else if(noww.getHours()>9 && noww.getMinutes()<=9){
			second.innerHTML=noww.getHours()+':'+'0'+noww.getMinutes();
		}
		
	};

// 前往今天
	var back=document.getElementById('back');
	back.onclick=function(){
		back.style.color='#D6D6D5';	
		date=new Date(yy,mm,dd);
		huarili();
		ondatechange();
	};


// 刷新的时候 设置时间
	ondatechange();

















}