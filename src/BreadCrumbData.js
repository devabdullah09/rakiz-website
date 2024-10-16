
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const countriesOption = [
  {
    label: 'England',
    value: 'england',
  },
  {
    label: 'Ireland',
    value: 'ireland',
  },
  {
    label: 'Other',
    value: 'other',
  },
  {
    label: 'Scotland',
    value: 'scotland',
  },
  {
    label: 'Wales',
    value: 'wales',
  },
]



export const CreateTeamBreadCrumb = [
  {
    name: 'My Teams',
    link: '/company/my-teams',
    color: 'inherit'
  },
  {
    name: 'New Team',
    link: '/company/teams/new',
    color: 'inherit'
  },
]


export const StaffBreadCrumb = [
  {
    name: 'Team',
    link: '/company/my-teams',
    color: 'inherit'
  },
  {
    name: 'New Member',
    link: '/company/teams/staff/new',
    color: 'inherit'
  },
]


export const StudentProgressOption = [
  {
    name: 'My Teams',
    link: '/company/my-teams',
    color: 'inherit'
  },
  {
    name: 'Bobbi Simpson',
    link: '',
    color: 'inherit'
  },
]


export const MyTeamOption = [
  {
    name: <FontAwesomeIcon
      icon={faHome}

    />,
    link: '/home/app',
    color: '#68B3C8',
  },
  {
    name: 'My Teams',
    link: '/company/my-teams',
    color: 'inherit'
  },
]