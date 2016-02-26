var express=require('express');
var app=express();

var http=require('http').Server(app);
// 让public文件可以通过'/'直接访问  html中可以不用写public
app.use(express.static('public'));

// 请求图片
// var pics={
// 		// 1448380800000:['image/1.jpg','image/2.jpg','image/3.jpg'],
// 		// 1448467200000:['image/4.jpg','image/5.jpg','image/6.jpg'],
// 		// 1447776000000:['image/2.jpg','image/1.jpg','image/4.jpg'],
// 		// 1448035200000:['image/6.jpg','image/3.jpg','image/5.jpg']
// 		'2015-10-25':['image/1.jpg','image/3.jpg','image/6.jpg'],
// 		'2015-10-18':['image/2.jpg','image/3.jpg','image/4.jpg'],
// 		'2015-10-23':['image/3.jpg','image/4.jpg','image/5.jpg']
// 	};
var shenqi={};
var fs=require('fs');
fs.readdir('./public/image',function(err,files){
	for(var i=0;i<files.length;i++){
		fs.stat('./public/image/'+files[i],(function(i){
			return function(err,info){
			var key=info.mtime.getFullYear()+'-'+info.mtime.getMonth()+'-'+info.mtime.getDate();
			if(!shenqi[key]){
				shenqi[key]=[];
			}
			shenqi[key].push(files[i]);
			// console.log(shenqi);
		};
		})(i) 
		);
	}
});

app.get('/aaa',function(req,res){
// 2种方法
	if(shenqi[req.query.time]){
	console.log(req.query.time);
		res.json(shenqi[req.query.time]);		
	}else{
		res.send('none');//没有也要返回一个值,不然服务器一直在等待
	}

	// for(var shuxing in pics){
	// 	if(shuxing==req.query.time){
	// 		res.json(pics[shuxing]);		
	// 	}
	// }
});

// res.json()--->{} [ ]  [{}]  {[]}
// res.send()---->13   '年内'
// res.sendFile();

app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(80,function(){
	console.log('listening on *:80');
});
