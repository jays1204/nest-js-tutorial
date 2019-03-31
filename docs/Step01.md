# Step 01


## App 생성
nest 커맨드를 이용하여 앱의 기본 구조를 만든다. 

```bash
$) nest new freeboard 
```  

- nest 커맨드가 설치되어 있지 않다면 아래를 통해 설치할 수 있다.   
    ```bash
    $) npm install -g @nestjs/cli
    ```

package manager는 npm을 선택하였다. 

이 에제에서 만들 최종적인 App은 사용자가 게시물을 읽고 쓸 수 있는 서버를 만드는 것을 목표로 한다.

## Module 생성
root directory에서 다음의 커맨드를 실행하여 module을 두개 생성한다.

```bash
$) nest g module user
$) nest g module post
```

이제 src/user, src/post가 생성되었고 각 directory에는 module 파일이 생성, root module에는 두개의 module이 import 되었다.

