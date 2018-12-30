    var renderVideo = function(props) {
        if(typeof props.video == 'string') {
            return (
                <a href={props.video} target="_blank" style={{display: 'block', position: "absolute", right:0, padding: "16px 10px", color:"#fff"}} title="Посмотреть обучалку">
                <span className="badge badge-secondary float-right" style={{padding: "3px 2px 2px"}}>
                        <i style={{marginRight: 0}} className="zmdi zmdi-play zmdi-hc-fw" ></i>
                </span>
                </a>
            )
        }
        return '';
    }

    var renderSubmenu = function(props) {
        if(typeof props.subMenu == 'object') {
            var subMenuTemplate = props.subMenu.map(function(sitem, index) {
                
                var textClass = (sitem.texttransformnone == 1) ? 'nav-text text-transform-none' : 'nav-text';
                var target    = (sitem.target == 1) ?  '_blank' : '';
                var addClass  = "zmdi "+sitem.addClass+ " zmdi-hc-fw";
                var rel = (typeof sitem.rel == 'undefined') ? '' : sitem.rel;

                return  (
                    <li key={index} style={{position: "relative"}} rel={rel}>
                        {renderVideo(sitem)}
                        <a className="menuLink" href={sitem.href} target={target}>
                            <i className={addClass}></i>
                            <span className={textClass}>{sitem.content}</span>
                        </a>
                    </li>
                )
            })

            return subMenuTemplate
        } else {
            return '';
        }
    }

    class Menu extends React.Component
    {

        render(){
            const menuTemplate = this.props.elements.map(function(item, index) {
                if(item.header == 1) {
                    return (
                        <li key={index} className="nav-header">{item.title}</li>
                    )
                } else {
                    var videoTemplate = '';
                    var addClass  = "zmdi "+item.addClass+ " zmdi-hc-fw";
                    var menuClass = (item.arrow == 1) ? menuClass = 'menu ' : "menu no-arrow";
                    var target    = (item.target == 1) ?  '_blank' : '';
                    var rel = (typeof item.rel == 'undefined') ? '' : item.rel;

                    return (
                        <li key={index} className={menuClass} rel={rel}>
                            {renderVideo(item)}
                            <a className="menuLink" href={item.href} target={target}>
                                <i className={addClass}></i>
                                <span className="nav-text">{item.content}</span>
                            </a>
                            
                            <ul className='sub-menu'>
                                {renderSubmenu(item)}
                            </ul>
                        </li>
                    )
                }
            })
          
            return (
                <ul className="nav-menu">{menuTemplate}</ul>
            );
        }
    };

    ReactDOM.render(
      <Menu elements={menu}/>,
      document.getElementById('main-menu')
    );
