
## while文
```js
// 例1
let sum = 0;
while(i <= 3){
	sum += i;
	console.log(sum);
}
// [LOG]: 1, 3, 6

// 例2
let i = 1;
while(i <= 10){
	i++;
	if(i % 2 === 1){
		continue;
	}
	console.log(i);
}
// [LOG]: 2, 4, 6, 8, 10
```

## for文
```js
let sum = 0;
for(let i= 1; i <=3; i++){
	sum += i
	console.log(sum);
}
[LOG]: 1, 3, 6
```