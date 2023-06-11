参考
[Fetch API を使うときの適切なエラー処理方法](https://zenn.dev/junki555/articles/4ab67fc78ce64c)
[Fetch APIでデーターを取得しながらPromiseとasyc/awaitを学んだまとめ - Qiita](https://qiita.com/Abbiscuit/items/66ee955509284e941803)

メモ

```js:geolocation.js
// ロードしてからDOM取得
window.onload = function () {
  const btn = document.getElementById("btn");
  const inputText = document.getElementById('input_text');
  const inputImage = document.getElementById('input_image');
  
  // async awaitでの処理
  btn.onclick = async function() {
    try {
      // awaitが完了するまで以降の処理に移らない
      const pos = await getCurrentPosition();
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log(inputText.value, lat, lng);

      const formData = new FormData();
      formData.append('text', inputText.value);
      if (inputImage.files.length > 0) {
        formData.append('image', inputImage.files[0]);
      }
      formData.append('latitude', lat);
      formData.append('longitude', lng);
      
      // fetch API
      const response = await fetch('/posts',{
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector("meta[name=csrf-token]").content
        },
        body: formData
      });

      // JSON形式でデータを受け取る
      const data = await response.json();

      if (response.ok) {
        // 成功時の処理
        console.log(data.message);
        window.location.href = '/posts';
      } else {
        // 失敗時の処理(variantエラーなど)
        console.error(data.message);

        // 擬似フラッシュメッセージをjsで作る
        const flash = document.querySelector('div.flash')
        flash.innerHTML = ''

        const message = document.createElement('div')
        message.classList.add('flash-message')
        message.innerText = data.message

        flash.appendChild(message)
      }
    } catch (error) {
      // fetchの失敗(ネットワークエラー)の処理
      console.error('Error:', error);
    }
  };
};

// デバイスで位置情報が取得できるかのジャッジ
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve);
  });
}
```

rails controller
```controller.erb
class Public::PostsController < ApplicationController
  
  def create
    @post = current_user.posts.new(user_location_params)
    if @post.save
      render json: { status: "success", message: "Post was successfully created." }, status: :created
    else
      render json: { status: "error", message: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
 end
```

itiou html
```html.erb
<input id="input_text", autofocus: true, placeholder="つぶやきを入力" /> <br />
<input id="input_image", type="file", accept=".jpg,.png,.JPEG,.PNG">
<button id="btn">つぶやく</button>

<br /><br />
<i class="fa-regular fa-image"></i>
```
