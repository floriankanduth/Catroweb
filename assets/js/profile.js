import 'external-svg-loader'
import './components/tab_bar'
import './follower_overview'

import { shareLink } from './custom/ShareLink'
import { ProjectList } from './components/project_list'

import '../styles/custom/profile.scss'
import '../styles/components/achievements.scss'

const userShare = document.querySelector('.js-user-share')

shareLink(
  userShare.dataset.themeDisplayName,
  userShare.dataset.transCheckOutUser,
  userShare.dataset.userUrl,
  userShare.dataset.transShareSuccess,
  userShare.dataset.transShareError,
  userShare.dataset.transCopy,
  userShare.dataset.transClipboardSuccess,
  userShare.dataset.transClipboardFail,
)

initUserProjects()

function initUserProjects() {
  const userProjects = document.querySelector('#projects-section')
  const projectLists = userProjects.querySelectorAll('.project-list')

  projectLists.forEach((projectList) => {
    const property = projectList.dataset.property
    const theme = projectList.dataset.theme
    const baseUrl = projectList.dataset.baseUrl
    const userId = projectList.dataset.userId
    const emptyMessage = projectList.dataset.emptyMessage

    const url = `${baseUrl}/api/projects/user/${userId}`

    projectList.dataset.list = JSON.stringify(
      new ProjectList(
        projectList,
        'user-projects',
        url,
        property,
        theme,
        999,
        emptyMessage,
      ),
    )
  })
}
