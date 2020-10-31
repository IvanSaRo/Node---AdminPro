 const getMenuFront = (role = 'USER_ROLE') => {
    const menu = [
      { titulo: 'Dashboard!', 
        icono: 'mdi mdi-gauge', 
        submenu: [
          { titulo: 'Main', url: '/'},
          { titulo: 'Gráficas', url: 'grafica1'},
          { titulo: 'Promesas', url: 'promesas'},
          { titulo: 'ProgressBar', url: 'progress'},
          { titulo: 'Rxjs', url: 'rxjs'},
        ]},
        { titulo: 'Mantenimiento', 
        icono: 'mdi mdi-folder-lock-open', 
        submenu: [
        //   { titulo: 'Usuarios', url: 'users'},
          { titulo: 'Médicos', url: 'doctors'},
          { titulo: 'Hospitales', url: 'hospitals'},
          
        ]}
    ]

    if(role === 'ADMNIN_ROLE'){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'users'})
    }

    return menu;
}

module.exports = {
    getMenuFront
}