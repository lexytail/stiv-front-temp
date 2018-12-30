    var renderAvatar = function(props) {

        if(props.self == 1) {
            return (
                <div className='avatar' style={{background:props.avatar}}></div>
            );
        } else {
            if(props.src !== '') {
                return (
                    <img src={props.src} className="user-avatar size-60" alt={props.username} title={props.username} />
                );
            } else {
                return (
                    <span>{props.username}</span>
                );
            }
        }
    }

    var renderMedias = function(props) {

        console.log(props.preview_medias.length, props.image);

            if(props.preview_medias.length == 0) {
                return (                               
                    <div>
                        <p className="crop" >
                            <img src={props.image} />
                        </p>
                    </div>
                )
            }

            var Media = props.preview_medias.map(function(item, index) {
                return (
                    <p className="crop" key={index}>
                        <img src={item.image_versions2.candidates[1].url} />
                     </p>
                )
            })

            if (props.typeicon == "") 
            {
                return (                               
                    <div>
                        {Media}
                    </div>
                )
            } else {
                return (                               
                    <div style={{position: "relative"}}>
                        {Media}
                        <i className={props.typeicon} style={{top:5, right:5, color: "#fff", padding: 1, background: "transparent", position: "absolute"}}></i>
                        <div style={{clear:"both"}}></div>
                    </div>
                )
                
            }
    }

    var renderItemText = function(props) {

        var text;
                switch(props.item.item_type) {
                    case 'profile':
                        return (
                            <div className="profilelinks">
                                <div className="openLink" rel={"https://www.instagram.com/"+props.item.profile.username}>
                                    <img src={props.item.profile.profile_pic_url} className="user-avatar size-60" alt={props.item.profile.username} title={props.item.profile.username} />
                                    <span>&nbsp;&nbsp;{props.item.profile.username}</span>
                                    <br/>
                                    <span>&nbsp;&nbsp;{props.item.profile.full_name}</span>
                                    {renderMedias({typeicon:"", preview_medias: props.item.preview_medias, image: props.item.profile.profile_pic_url})}
                                </div>
                            </div>
                        )
                    break;
                    case 'hashtag':
                        var hashtag = props.item.hashtag.name.replace(/#/gi,'');
                        return (
                            <div className="profilelinks">      
                                <div className="openLink" rel={"https://www.instagram.com/explore/tags/"+hashtag+"/"}>
                                    <span>&nbsp;&nbsp;#{props.item.hashtag.name}</span>
                                    {renderMedias({typeicon:"", preview_medias: props.item.preview_medias})}
                                </div>
                            </div>
                        )
                    break;

                    case 'animated_media':
                        
                        return (
                            <img className="openLink" rel={props.item.animated_media.images.fixed_height.url} src={props.item.animated_media.images.fixed_height.url} style={{width: "100px"}}/>
                        )

                    break;

                    case 'raven_media':
                        if (props.item.visual_media.media.video_versions)
                        return (
                            <img className="openLink" rel={props.item.visual_media.media.video_versions[0].url} src={props.item.visual_media.media.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                        )
                        text = '[Видео уже просмотрено]'

                    break;
                    case 'reel_share':
                        
                        if (props.item.reel_share.type === 'mention') {
                            text = `Упомянул(-а) вас в своей истории`;
                            if(!props.item.reel_share.media.image_versions2) {
                                return (
                                    <div>
                                        <div>[История просрочена]</div>
                                        <div dangerouslySetInnerHTML={{__html:text}}></div>
                                    </div>
                                );
                            }
                            const image = props.item.reel_share.media.image_versions2.candidates[0].url;
                            return (
                                <div>
                                    <img className="openLink" rel={image} src={image} style={{width: "100px"}}/>
                                    <div dangerouslySetInnerHTML={{__html:text}}></div>
                                </div>
                            );
                        }
                        // if (props.item.reel_share.type === 'reaction') {
                        else {
                            text = `Вы отреагировали на историю: ${props.item.reel_share.text}`;
                            if(!props.item.reel_share.media.image_versions2) {
                                return (
                                    <div>
                                        <div>[История просрочена]</div>
                                        <div dangerouslySetInnerHTML={{__html:text}}></div>
                                    </div>
                                );
                            }
                            if(props.item.reel_share.media.media_type == 1) {
                                return (
                                    <div>
                                        <img className="openLink" rel={props.item.reel_share.media.image_versions2.candidates[0].url} src={props.item.reel_share.media.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                                        <div dangerouslySetInnerHTML={{__html:text}}></div>
                                    </div>
                                );
                            } else if(props.item.reel_share.media.media_type == 2) {
                                return (
                                    <div>
                                        <img className="openLink" rel={props.item.reel_share.media.image_versions2.candidates[0].url} src={props.item.reel_share.media.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                                        <div dangerouslySetInnerHTML={{__html:text}}></div>
                                    </div>
                                )
                            }
                        }
                    break;

                    case 'video_call_event':
                        return (
                            <div>
                                <div>[Завершен видео звонок]</div>
                            </div>
                        )
                    break;

                    case 'media':
                        if(props.item.media.media_type == 1) {
                            return (
                                <img className="openLink" rel={props.item.media.image_versions2.candidates[0].url} src={props.item.media.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                            );
                        } else if(props.item.media.media_type == 2) {
                            return (
                                <img className="openLink" rel={props.item.media.image_versions2.candidates[0].url} src={props.item.media.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                            )
                        } 
                    break;

                    case 'media_share':

                        if(props.item.media_share) {
                            var mediashare = props.item.media_share;
                        } else if(props.item.direct_media_share) {
                            var mediashare = props.item.direct_media_share.media;
                        }

                        if(mediashare.media_type == 8) {
                            var med = mediashare.carousel_media[0];
                        }

                        var typeicon="zmdi zmdi-image zmdi-hc-2x";
                        switch(mediashare.media_type) {
                            case 2:
                                typeicon="zmdi zmdi-videocam zmdi-hc-2x";
                            case 1:
                                    return (
                                        <div className="profilelinks">
                                            <div className="openLink" rel={'https://www.instagram.com/p/'+mediashare.code}>
                                                <img src={mediashare.user.profile_pic_url} className="user-avatar size-60" alt={mediashare.user.username} title={mediashare.user.username} />
                                                <span>&nbsp;&nbsp;{mediashare.user.username}</span>
                                                <br/>
                                                <div style={{position: "relative"}}>
                                                    <p className="crop">
                                                        <img className="openLink" rel={'https://www.instagram.com/p/'+mediashare.code} src={mediashare.image_versions2.candidates[0].url} style={{width: "100px"}}/>
                                                    </p>
                                                    <i className={typeicon} style={{top:5, right:5, color: "#fff", padding: 1, background: "transparent", position: "absolute"}}></i>
                                                    <div style={{clear:"both"}}></div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    );
                            break;
                            
                            case 8:
                                if(med.media_type == 1 || med.media_type == 2) {
                                    return (
                                        <div className="profilelinks">
                                            <div className="openLink" rel={'https://www.instagram.com/p/'+mediashare.code}>
                                                <img src={mediashare.user.profile_pic_url} className="user-avatar size-60" alt={mediashare.user.username} title={mediashare.user.username} />
                                                <span>&nbsp;&nbsp;{mediashare.user.username}</span>
                                                <br/>
                                                {renderMedias({typeicon:"zmdi zmdi-hc-2x zmdi-collection-video", preview_medias: [mediashare.carousel_media[0]]})}
                                            </div>
                                        </div>
                                    );
                                } else {
                                    text = '[медиа2]';
                                }
                            break;
                        }
                    break;

                    case 'like':
                        text = props.item.like;
                    break;

                    case 'link':

                        var urlPattern = /\b(?:https?):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
                        
                        text = props.item.link.text;
                        text = text.replace(urlPattern, '<a target="_blank" href="$&">$&</a>');
                        text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');

                        //text.replace(hpattern, '<a target="_blank" href="$&">$&</a>')
                        //text.replace(ppattern, '<a target="_blank" href="$&">$&</a>')

                    break;

                    case 'placeholder':
                        // text = '['+props.item.placeholder.message+']';
                        text = '[Формат этого сообщения, будет доступен в будущих обновлениях]';
                    break;
                    
                    case 'text':
                        text = props.item.text;
                        text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');
                        
                        

                        text = text.replace(/(?:|^)(?:#(?!\d+(?:\s|$)))(\w+)(?=\s|#|$)/gi, '<a target="_blank" href="$&">$&</a>');
                        //text = text.replace(/(@\W+)/g, '<a target="_blank" href="$&">$&</a>');
                    break;

                    case 'action_log':
                    case 'live_viewer_invite':
                        return '';
                    break;

                    default: 
                        text = '['+props.item.item_type+']';
                    break;
                }
                
                return (
                    <div dangerouslySetInnerHTML={{__html:text}}></div>
                );
    }


    var renderChatHeader = function(props) {
        if(props.newchatOpen == 1) {
                    return (
                        <div className="chat-main-header">
                            <div className="chat-main-header-info">
                                <div className="chat-avatar mr-2">
                                    <div className="chat-avatar-mode">
                                    </div>
                                </div>
                                <div className="chat-contact-name">{props.newchatName}</div>
                            </div>
                        </div>
                    );
        } else {

            if(typeof props.activeThread !== 'undefinded' && props.activeThread !== null && Object.keys(props.activeThread).length > 0) {

                var username = props.activeThread.thread_title;
                var avatar = props.activeThread.users[0].profile_pic_url;

                    return (
                        <div className="chat-main-header">
                            <div className="chat-main-header-info">
                                <div className="chat-avatar mr-2">
                                    <div className="chat-avatar-mode">
                                        {renderAvatar({src:avatar, username:username})}
                                    </div>
                                </div>
                                <div className="chat-contact-name">{username}</div>
                            </div>
                        </div>
                    );

            } else {
                    return (
                        <div className="chat-main-header">
                            <div className="chat-main-header-info">
                                <div className="chat-avatar mr-2">
                                    <div className="chat-avatar-mode">
                                    </div>
                                </div>
                                <div className="chat-contact-name"></div>
                            </div>
                        </div>
                    );
            }
        }
    }
    
    var renderChatFooter = function(props) {
        
        var returnPanel = 0; 
        
        if(props.newchatOpen == 1) {
            returnPanel = 1;
        } else {
            if(props.pendingOpen == 1) {
                if(typeof props.messages == 'object' && Object.keys(props.messages).length > 0) {
                    return (
                        <div className="chat-main-footer">
                            <div className="d-flex flex-row align-items-center">
                                <div className="approveClient">
                                    <a style={{color: 'green', border: '1px solid green', padding: '10px', cursor: 'pointer', margin: '5px'}}>
                                        Принять
                                    </a>
                                </div>
                                <div className="declineClient">
                                    <a style={{color: 'red', border: '1px solid red', padding: '10px', cursor: 'pointer'}}>
                                        Отклонить
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="chat-main-footer">
                            <div className="d-flex flex-row align-items-center">
                                <div className="col">
                                    <div className="form-group">
                                    </div>
                                </div>
                                <div className="chat-sent">
                                </div>
                            </div>
                        </div>
                    );
                }
            } else {
                if(typeof props.messages == 'object' && Object.keys(props.messages).length > 0) {
                    returnPanel = 1;
                } else {
                        return (
                            <div className="chat-main-footer">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="col">
                                        <div className="form-group">
                                        </div>
                                    </div>
                                    <div className="chat-sent">
                                    </div>
                                </div>
                            </div>
                        );
                }
            }
        }

        if(returnPanel == 1) {
                        return (
                            <div className="chat-main-footer">

                                <div className="col">
                                    <div className="form-group">
                                        <textarea className="border-0 form-control chat-textarea" placeholder="Введите текст"></textarea>
                                    </div>
                                </div>

                                <div className="d-flex flex-row align-items-center">
                                    
                                    <div className="like-sent" title="Лайк">
                                        <a className="action-btn">
                                                &#x2764;
                                        </a>
                                    </div>

                                    <div className="file-sent">
                                        <a className="action-btn" title="Отправить файл">
                                            <i className="zmdi zmdi-upload"></i>
                                        </a>
                                    </div>
                                    
                                    <div className="post-sent">
                                        <a className="action-btn" title="Отправить пост">
                                            <i className="zmdi zmdi-instagram"></i>
                                        </a>
                                    </div>
                                    

                                    <div className="hashtag-sent" title="Отправить хештег">
                                        <a className="action-btn">
                                            #
                                        </a>
                                    </div>

                                    <div className="profile-sent" title="Отправить профиль">
                                        <a className="action-btn">
                                            <i className="zmdi zmdi-account-box"></i>
                                        </a>
                                    </div>
                                    
                                    <div className="chat-sent">
                                        <a className="action-btn">
                                            <i className="zmdi zmdi-mail-send"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
        }
    }

    var renderChatMessages = function(props) {
        //console.log(typeof props.newchatOpen, typeof props.newchatName);
        //console.log(props.newchatOpen, props.newchatName);

        if(props.newchatOpen == 1) {
                return (
                    <div className="chat-list-scroll" style={{position: "relative"}}>
                        <div className="chat-main-content">
                        </div>
                    </div>
                );
        } else {

            if(typeof props.messages == 'object' && props.messages !== null && Object.keys(props.messages).length > 0) {

                var users = [];
                
                props.activeThread.users.forEach(function(item) {
                    users[item.pk] = item;
                })

                
                users[props.user.uid] = {
                    name: props.user.name,
                    pk: props.user.uid,
                    profile_pic_url: ''
                };


                var chatMessages = props.messages[0].map(function(item, index) {
                    var timestamp = new Date(item.timestamp/1000);
                    var dateS = 
                        (timestamp.getDate() < 10 ? '0'+timestamp.getDate() : timestamp.getDate())
                        + '.'
                        + ((timestamp.getMonth()+1) < 10 ? '0'+(timestamp.getMonth()+1) : (timestamp.getMonth())+1)
                        +' ' 
                        + ((timestamp.getHours()) < 10 ? '0'+(timestamp.getHours()) : (timestamp.getHours()))
                        + ':' 
                        + ((timestamp.getMinutes()) < 10 ? '0'+(timestamp.getMinutes()) : (timestamp.getMinutes()))

                    var cna = '';

                    cna = "d-flex flex-nowrap chat-item";

                    var avatar = '';
                    
                    if (item.user_id != props.user.uid) {

                        cna = "d-flex flex-nowrap chat-item flex-row-reverse";
                        
                        if ( typeof users[item.user_id]  == 'undefined')
                        {                        
                            
                            avatar = renderAvatar({src:props.user.children[1].style.backgroundImage.slice(5, -2), username:item.user_id});
                        } else {
                            avatar = renderAvatar({src:users[item.user_id].profile_pic_url, username:users[item.user_id].username});
                        }
                    } else {
                        avatar = renderAvatar({self:"1", avatar:props.user.avatarDiv.style.background});
                    }

                    var text = renderItemText({item:item});

                    if(text == '') return '';

                    if(item.item_type == 'link') {
                        return (
                            <div className={cna} key={index} rel={item.item_id}>
                                {avatar}
                                <div className="bubble">
                                    <div className="message">{text}</div>
                                    <div className="time">{dateS}</div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div className={cna} key={index} rel={item.item_id}>
                            {avatar}
                            <div className="bubble">
                                <div className="message">{text}</div>
                                <div className="time">{dateS}</div>
                            </div>
                        </div>
                    );
                })
                
                return (
                    <div className="chat-list-scroll" id="chatListScroll" style={{position: "relative"}}>
                        <div className="chat-main-content" >
                            {chatMessages}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="chat-list-scroll" style={{position: "relative"}}>
                        <div className="chat-main-content">
                            <br/><br/>
                             &nbsp;&nbsp;&nbsp;&larr; Выберите необходимый чат
                        </div>
                    </div>
                );
            }
        }
    }

    var renderChatList = function(props) {
        

        if(typeof props.threads == 'object') {
        
            var chatList = props.threads.map(function(item, index) {
                

                var last_activity_at = new Date(item.last_activity_at/1000);

                //var dateS = last_activity_at.getDate() + '.' + (last_activity_at.getMonth()+1) +' ' + last_activity_at.getHours() + ':' + last_activity_at.getMinutes();

                var dateS = 
                    (last_activity_at.getDate() < 10 ? '0'+last_activity_at.getDate() : last_activity_at.getDate())
                    + '.'
                    + ((last_activity_at.getMonth()+1) < 10 ? '0'+(last_activity_at.getMonth()+1) : (last_activity_at.getMonth())+1)
                    +' ' 
                    + ((last_activity_at.getHours()) < 10 ? '0'+(last_activity_at.getHours()) : (last_activity_at.getHours()))
                    + ':' 
                    + ((last_activity_at.getMinutes()) < 10 ? '0'+(last_activity_at.getMinutes()) : (last_activity_at.getMinutes()))


                var text = '';
                var username = '';
                var avatar = '';
                var user_id = '';

                var last_permanent_item = item.items[0];
                user_id = last_permanent_item.user_id;

                switch(last_permanent_item.item_type) {
                    case 'like':
                        text = last_permanent_item.like;
                    break;
                    case 'text':
                        text = last_permanent_item.text;
                    break;
                    case 'action_log':
                        return '';
                    break;
                    case 'media':
                        if(last_permanent_item.media.media_type == 1)
                            text = '[изображение]';
                        else if(last_permanent_item.media.media_type == 2)
                            text = '[видео]';
                        else 
                            text = '[медиа]';
                    break;
                    default:
                            text = '['+last_permanent_item.item_type+']';
                    break;
                }

                var user = item.users[0];

                // console.log('USER', user);

                if (!user) return;
                
                return (
                        <div className="chat-user-item" key={index} rel={item.thread_id} rel_v2={item.thread_v2_id}>
                            <div className="chat-user-row row">
                                <div className="chat-avatar col-2">
                                    <div className="chat-avatar-mode">  
                                        <img src={user.profile_pic_url} className="user-avatar size-40" alt={user.username} title={user.username} rel={user.pk}/>
                                    </div>
                                </div>
                                <div className="chat-info col-8">
                                    <span className="name h4">{user.username}</span>
                                    <div className="chat-info-des">{text}</div>
                                    <div className="last-message-time">{dateS}</div>
                                </div>
                                <div className="chat-date col-2">
                                    <span className="bg-primary rounded-circle badge text-white"></span>
                                </div>
                            </div>
                        </div>
                )
            })


            return  (
                    <div id="gxChatModuleSidebar" className="chat-sidenav">
                        <div className="chat-sidenav-main">
                            <div className="chat-sidenav-content">
                                <div className="tab-content">
                                    <div id="chatList" className="tab-pane active ps-custom-scrollbar" style={{position: "relative"}}>
                                        <div className="chat-user">
                                            {chatList}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    );
        } else {
            return  '';
        }
    }

    class Chat extends React.Component
    {
        render(){
            return (
            
                <div className="gx-module chat-module">
                    {renderChatList(this.props)}
                    <div className="chat-module-box">
                        <div className="chat-box">
                            <div className="chat-box-main">
                                <div className="chat-main">
                                    {renderChatHeader(this.props)}
                                    {renderChatMessages(this.props)}
                                    {renderChatFooter(this.props)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
