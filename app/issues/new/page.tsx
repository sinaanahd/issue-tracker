import dynamic from 'next/dynamic'
import IssueFromSkeleton from './loading'

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFromSkeleton />,
})

const NewIssuePage = () => {
  return <IssueForm />
}

export default NewIssuePage
