export interface IconProps extends React.ComponentProps<'svg'> {
  icon:
    | 'complete'
    | 'dashboard'
    | 'edit'
    | 'important'
    | 'inProgress'
    | 'job'
    | 'message'
    | 'reassign'
    | 'data'
    | 'area'
    | 'builder'
    | 'community'
    | 'company'
    | 'contractor'
    | 'reporter'
    | 'logout'
    | 'scope'
    | 'supplier'
    | 'address'
    | 'orderNumber';
}
