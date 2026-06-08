export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="badge">Next.js + Vercel</p>
        <h1>你好，我的网站上线啦</h1>
        <p className="subtitle">
          这是一个最简单的 Next.js 个人主页，可以直接部署到 Vercel。
        </p>
        <div className="buttons">
          <a href="mailto:your-email@example.com" className="primary">
            联系我
          </a>
          <a href="https://github.com" target="_blank" className="secondary">
            GitHub
          </a>
        </div>
      </section>

      <section className="cards">
        <div className="card">
          <h2>关于我</h2>
          <p>这里可以写你的学校、研究方向、项目经历或者个人介绍。</p>
        </div>
        <div className="card">
          <h2>项目</h2>
          <p>这里可以放你的论文、代码仓库、课程项目或作品展示。</p>
        </div>
        <div className="card">
          <h2>联系</h2>
          <p>这里可以放邮箱、GitHub、Google Scholar、LinkedIn 等链接。</p>
        </div>
      </section>
    </main>
  );
}
