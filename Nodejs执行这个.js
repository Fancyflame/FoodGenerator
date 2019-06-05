
const fs=require('fs');//                                                        
console.log("开始转录");
var g=tp("spawn_rules");
g=g.split("->");
var z={};
for(var i in g){
  let y=g[i].replace("?","");
  if(z[g[i]])continue;
  z[g[i]]=read(y);
}
z=JSON.stringify(z);

function tp(l,notxt){
  return fs.readFileSync(__dirname+"/"+l+(notxt?"":".txt"),"utf8");
}
function read(f){
var u=tp(f);
var rpt=[];
var checkrpt=/(\n+.+\n+)[^\1]*(\1)/g
while(true){
let b=checkrpt.exec("\n"+u+"\n");
if(RegExp.$2){
  let out=String(RegExp.$2).replace(/\n/g,"");
  rpt.push(out);
  checkrpt.lastIndex-=(b[0].length-2)
}else break;
}
if(rpt.length!=0)
  console.log("\n******\n在检索"+f+"时发现重复项："+
    rpt+"\n******\n")
u=u.match(/(.+)/g);
var p=[];
for(var i in u){
  var t=u[i];
  var lth=t.length;
  let pp=false
  if(p.length<lth){
    let y=p.length;
    for(var ii=p.length;ii<lth;ii++){
      p.push([]);
    }
    pp=true;
  }
  p[lth-1].push(t);
}
/*u=u.replace(h,'"$1",');
h=/(.+)\n(.+)\n(.+)\n(.+\n)/g
u=u.replace(h,"$1$2$3$4");
u=u.substring(0,u.length-1)
u='"'+f+'":['+u+']'+(foo?"":",");*/
console.log(f+"已转录");
return p;
}
console.log("读取完成，准备生成网页");
var html=tp("rawHTML.html",true)
html=html.replace("@json@",z).replace("@list@",JSON.stringify(g));
fs.writeFileSync(__dirname+"/随机食物.html",html,"utf8");
console.log("网页保存为 随机食物.html ，生成完毕");