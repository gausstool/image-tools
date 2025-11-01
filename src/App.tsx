import Home from './pages/Home';;
import GithubBadge from './components/GithubBadge';
import MacDots from './components/MacDots';

function AppHead() {
  return (
    <div className="layout-header">
      <MacDots></MacDots>
      <div className="layout-header-right">
        <h1 className="layout-header-title">欢迎使用图片工具箱，免费在线压缩您的 SVG, WebP, JPEG 和 PNG 图片，纯本地运行无需上传至服务器</h1>
      </div>
    </div>
  );
}

function AppMain() {
  return (
    <Home />
  );
}

function AppBody() {
  return (
    <div className="layout__body">
      <AppMain />
    </div>
  );
}

function App() {
  return (

    <div className="layout">
      <div className="layout__container app-container">
        <div className="layout__container--inner ">
          <AppHead />
          <AppBody />
        </div>
        <GithubBadge url="https://github.com/gausstool/image-tools" />
      </div>
    </div>

  );
}

export default App;