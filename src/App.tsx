import Layout from './components/layout';
import GithubTableUsers from './components/github/list-users';

function App() {
  return (
    <Layout>
      <div className="p-2">
        <GithubTableUsers />
      </div>
    </Layout>
  )
}

export default App
