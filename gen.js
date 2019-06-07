const fs=require("fs");                                                     
console.log("Generating...");
let rules=fs.readFileSync("spawn/spawn_rules.txt").toString().split("->");
let arr_=rules;
let objl={};
let repc=[];
console.log("Processing files");
for(let i of rules){
	let iscsv=false;
	if(i.charAt(0)=="!"){
		iscsv=!0;
		i=i.replace("!","");
	}
	objl[i]=fs.readFileSync("spawn/"+i.replace("?","")+(iscsv?".csv":".txt")).toString().split("\n");
	if(iscsv){
		for(let j in objl[i]){
			objl[i][j]=objl[i][j].split(",")[1];
		}
	}
}
for(let i in arr_){
	arr_[i]=arr_[i].replace("!","");
}
console.log("Processing empty & repeat");
for(let i in objl){
	let goingtosplice=[];
	for(let j in objl[i]){
		if(repc.indexOf(objl[i][j])!=-1||objl[i][j]==""||objl[i][j]==null)goingtosplice.push(j);
		else{repc.push(objl[i][j]);}
	}
	for(let r=goingtosplice.length-1;r>=0;r--){
		objl[i].splice(goingtosplice[r],1);
	}
}
console.log("Processing html");
let html=fs.readFileSync("index.html").toString();
html=html.replace(/const objl=\{(.*?)\};/g,"const objl="+JSON.stringify(objl)+";");
html=html.replace(/const arr_=\[(.*?)\];/g,"const arr_="+JSON.stringify(arr_)+";");
fs.writeFileSync("index.html",html);