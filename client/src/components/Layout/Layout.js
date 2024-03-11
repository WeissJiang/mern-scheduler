import { useEffect, useState } from 'react';
import { 
  UnorderedListOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/cute.jpg'
import './Layout.scss'

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const windowUrl = window.location.pathname; // => contact
  // const windowFullUrl = window.location.ref; // => http://localhost:5173/contact

  useEffect(() => {
    console.log('url: ', windowUrl)
  });

  const navigate = useNavigate();
  const { Header, Sider } = Layout;
  const [current, setCurrent] = useState(windowUrl);

  const mainMenuItems = [
    {
      label: 'Home',
      key: '/',
      icon: '',
      subItems: []
    },
    {
      label: 'About Me',
      key: '/about',
      icon: '',
      subItems: []
    },
    {
      label: 'Project Management',
      key: '/project-management',
      icon: '',
      subItems: [
        {
          label: 'Ticket',
          key: '/project-management/ticket',
          icon: '',
          options: [],
        },
        {
          label: 'Scheduler',
          key: '/project-management/scheduler',
          icon: '',
          options: []
        }
      ]
    },
    {
      label: 'Games',
      key: '/games',
      icon: '',
      subItems: [
        {
          label: 'Game 1',
          key: '/games/game-one',
          icon: '',
          options: []
        }
      ]
    },
    {
      label: 'Utility',
      key: '/utility',
      icon: '',
      subItems: [
        {
          label: 'Timer',
          key: '/utility/timer',
          icon: '',
          options: []
        }
      ]
    },
    {
      label: 'Pinata',
      key: '/pinata',
      icon: '',
      subItems: []
    },
    {
      label: 'Contact',
      key: '/contact',
      icon: '',
      subItems: []
    }
  ]

  const responsiveSubItems = mainMenuItems.map((item) => {
    const subItem = {
      key: item.key,
      label: `${item.label}`
    };

    if(item.subItems.length > 0){
      subItem.children = item.subItems.map((sub) => {
        return {
          key: sub.key,
          label: `${sub.label}`,
        };
      })
    }
    return subItem
  });

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    console.log(openKeys)
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && responsiveSubItems.map(i => i.key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const menuHandleOk = (e) => {
    let target = null;
  
    for (let index = 0; index < mainMenuItems.length; index++) {
      const item = mainMenuItems[index];
      const key = item.key;
      if(key === e.key) target = item;
  
      for (let j = 0; j < item.subItems.length; j++) {
        const subItem = item.subItems[j];
        const subKey = subItem.key;
        if(subKey === e.key) target = subItem;
      }
    }
  
    if (target) {
      navigate(target.key, { replace: true });
    }

    setCurrent(() => target.key);
  }

  const [collapsed, setCollapsed] = useState(false);
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  
  const toggleCollapsed = () => {
    setCollapsed((collapsed) => !collapsed);
    setShowVerticalNav((showVerticalNav) => !showVerticalNav)
  };

  return (
    <Layout>
      <Header>
        <div className='logo'>
          <img src={Logo} alt="Weiss" />
        </div>
        <Menu 
          className='horizontal-main-menu'
          theme="dark"
          onClick={menuHandleOk} 
          selectedKeys={[current]} 
          mode="horizontal"
          items={responsiveSubItems} 
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />  
        <Button className='ghost-button' ghost onClick={toggleCollapsed}>
          {collapsed ? <CloseOutlined /> : <UnorderedListOutlined />}
        </Button>
      </Header>
      <section>
        { showVerticalNav
          ? <Menu 
              className='vertical-main-menu'
              mode="inline"
              openKeys={openKeys}
              selectedKeys={[current]} 
              items={responsiveSubItems} 
              onOpenChange={onOpenChange}
              onClick={menuHandleOk} 
              style={{
                flex: 1,
                minWidth: 0,
              }}
          /> 
          : null
        }
        
      </section>
      <Layout>
        <Sider
          collapsible
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            openKeys={openKeys}
            selectedKeys={[current]} 
            items={responsiveSubItems}
            onOpenChange={onOpenChange}
            onClick={menuHandleOk}
            style={{
              height: '100%',
              borderRight: 0,
            }}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
            items={[
              {title: 'Home'},
              {title: 'List'},
              {title: 'App'}
            ]}
          >
          </Breadcrumb>
          <div
            style={{
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet style={{ height: '-webkit-calc(100% - 64px)' }} />
          </div>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;