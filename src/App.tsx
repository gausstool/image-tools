import './App.css';
import Home from './pages/Home';;

function AppHead() {
  return (
    <div className="layout-header">
      <div className="vscode-dots">
        <span className="vscode-dot vscode-dot--red"></span>
        <span className="vscode-dot vscode-dot--yellow"></span>
        <span className="vscode-dot vscode-dot--green"></span>
      </div>
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
      <div className="layout__container">
        <AppHead />
        <AppBody />
      </div>
    </div>

  );
}

export default App;