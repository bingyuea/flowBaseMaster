/**
 * Created by OXOYO on 2020/6/22
 *
 * 工具项配置
 */

export default function (system = {}, disableTools = [], enableTools = [], shortcutMap = {}) {
  // 工具项快捷键列表
  shortcutMap = {
    undo: { tool: 'undo', key: 'mod+z', label: 'Ctrl + Z', description: '' },
    clearLog: { tool: 'clearLog', key: 'mod+shift+l', label: 'Ctrl + Shift + L', description: '' },
    history: { tool: 'history', key: 'mod+shift+h', label: 'Ctrl + Shift + H', description: '' },
    redo: { tool: 'redo', key: 'mod+shift+z', label: 'Ctrl + shift + Z', description: '' },
    copy: { tool: 'copy', key: 'mod+c', label: 'Ctrl + C', description: '' },
    paste: { tool: 'paste', key: 'mod+v', label: 'Ctrl + V', description: '' },
    delete: { tool: 'delete', key: ['del', 'backspace'], label: 'Delete', description: '' },
    clear: { tool: 'clear', key: 'mod+shift+c', label: 'Ctrl + Shift + C', description: '' },
    zoomIn: { tool: 'zoomIn', key: ['mod+=', 'mod+plus'], label: 'Ctrl + +', description: '' },
    zoomOut: { tool: 'zoomOut', key: 'mod+-', label: 'Ctrl + -', description: '' },
    fit: { tool: 'fit', key: 'mod+0', label: 'Ctrl + 0', description: '' },
    actualSize: { tool: 'actualSize', key: 'mod+1', label: 'Ctrl + 1', description: '' },
    selectAll: { tool: 'selectAll', key: 'mod+a', label: 'Ctrl + A', description: '' },
    up: { tool: 'up', key: 'up', label: 'up', description: '' },
    down: { tool: 'down', key: 'down', label: 'down', description: '' },
    left: { tool: 'left', key: 'left', label: 'left', description: '' },
    right: { tool: 'right', key: 'right', label: 'right', description: '' },
    ...shortcutMap
  }

  // 工具列表
  let toolList = [
    {
      name: 'undo',
      label: 'Undo',
      lang: 'L10001',
      type: 'normal',
      icon: 'undo',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.undo,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'clearLog',
      label: 'ClearLog',
      lang: 'L10032',
      type: 'normal',
      icon: 'clear-log',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.clearLog,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'redo',
      label: 'Redo',
      lang: 'L10002',
      type: 'normal',
      icon: 'redo',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.redo,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      }
    },
    {
      name: 'copy',
      label: 'Copy',
      lang: 'L10003',
      type: 'normal',
      icon: 'copy',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      // FIXME 通用mod助手用于设置跨平台快捷方式，用于将command+c在Windows和Linux上映射到mod+c
      shortcuts: shortcutMap.copy,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: false
      }
    },
    {
      name: 'paste',
      label: 'Paste',
      lang: 'L10004',
      type: 'normal',
      icon: 'paste',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.paste,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas', 'node', 'edge'],
        style: {},
        divider: false
      }
    },
    {
      name: 'delete',
      label: 'Delete',
      lang: 'L10010',
      type: 'normal',
      icon: 'delete',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.delete,
      toolbar: {
        enable: false,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: true
      }
    },
    {
      name: 'clear',
      label: 'Clear',
      lang: 'L10005',
      type: 'normal',
      icon: 'clear',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.clear,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      }
    },
    {
      name: 'zoom',
      label: 'Zoom',
      lang: 'L10029',
      type: 'dropdown-list',
      icon: 'zoom',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 3,
      // 自定义值对象
      custom: {
        name: 'custom',
        label: '',
        lang: '',
        type: 'normal',
        icon: '',
        data: '',
        enable: false
      },
      // 锁定下拉菜单label
      lockLabel: false,
      // 子节点
      children: [
        {
          name: '25%',
          label: '25%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 0.25,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '50%',
          label: '50%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 0.5,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '75%',
          label: '75%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 0.75,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '100%',
          label: '100%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 1,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '125%',
          label: '125%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 1.25,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '150%',
          label: '150%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 1.5,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '200%',
          label: '200%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 2,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '300%',
          label: '300%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 3,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: '400%',
          label: '400%',
          lang: '',
          type: 'normal',
          icon: '',
          data: 4,
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'zoomIn',
      label: 'Zoom In',
      lang: 'L10006',
      type: 'normal',
      icon: 'zoom-in',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      // FIXME mod+= 用于支持主键盘区的+，mod+plus用于支持数字键盘区的+
      shortcuts: shortcutMap.zoomIn,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'zoomOut',
      label: 'Zoom Out',
      lang: 'L10007',
      type: 'normal',
      icon: 'zoom-out',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: shortcutMap.zoomOut,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      }
    },
    {
      name: 'fit',
      label: 'Fit',
      lang: 'L10008',
      type: 'normal',
      icon: 'fit',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: shortcutMap.fit,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'actualSize',
      label: 'Actual Size',
      lang: 'L10009',
      type: 'normal',
      icon: 'actual-size',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: shortcutMap.actualSize,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'canvasBackground',
      label: 'Canvas background',
      lang: '画布背景颜色',
      type: 'dropdown-color-picker',
      icon: 'canvas-background',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true
      // 子节点
    },
    {
      name: 'fill',
      label: 'fill',
      lang: 'L10011',
      type: 'dropdown-color-picker',
      icon: 'fill',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: false
      }
    },
    {
      name: 'lineColor',
      label: 'line color',
      lang: 'L10012',
      type: 'dropdown-color-picker',
      icon: 'line-color',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: false
      }
    },
    {
      name: 'lineWidth',
      label: 'line width',
      lang: 'L10013',
      type: 'dropdown-list',
      icon: 'line-width',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 1,
          label: '1px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 1,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 2,
          label: '2px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 2,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 3,
          label: '3px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 3,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 4,
          label: '4px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 4,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 5,
          label: '5px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 5,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 6,
          label: '6px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 6,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 7,
          label: '7px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 7,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 8,
          label: '8px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 8,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 9,
          label: '9px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 9,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 10,
          label: '10px',
          lang: '',
          type: 'normal',
          icon: '',
          data: 10,
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'lineDash',
      label: 'line style',
      lang: 'L10014',
      type: 'dropdown-list',
      icon: 'line-style',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: false,
      // 子节点
      children: [
        {
          name: 'solid',
          label: 'solid',
          lang: '',
          type: 'normal',
          icon: 'solid',
          data: 'solid',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'dashed',
          label: 'dashed',
          lang: '',
          type: 'normal',
          icon: 'dashed',
          data: 'dashed',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'dot',
          label: 'dot',
          lang: '',
          type: 'normal',
          icon: 'dot',
          data: 'dot',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'lineType',
      label: 'line type',
      lang: 'L10015',
      type: 'dropdown-list',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['edge'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: false,
      // 子节点
      children: [
        {
          name: 'x-broken',
          label: 'broken',
          lang: '',
          type: 'normal',
          icon: 'flow-broken',
          data: 'x-broken',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'x-line',
          label: 'line',
          lang: '',
          type: 'normal',
          icon: 'flow-line',
          data: 'x-line',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'x-cubic',
          label: 'cubic',
          lang: '',
          type: 'normal',
          icon: 'flow-curve',
          data: 'x-cubic',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'startArrow',
      label: 'start arrow',
      lang: 'L10016',
      type: 'dropdown-list',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['edge'],
        style: {
          'white-space': 'nowrap'
        },
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: false,
      // 子节点
      children: [
        {
          name: 'none',
          label: 'none',
          lang: '',
          type: 'normal',
          icon: 'solid',
          style: {},
          data: false,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'solidArrow',
          label: 'solid arrow',
          lang: '',
          type: 'normal',
          icon: 'solid-arrow',
          style: {},
          data: {
            style: {
              path: 'M0,0 L20,-10 L20,10 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'normalArrow',
          label: 'normal arrow',
          lang: '',
          type: 'normal',
          icon: 'normal-arrow',
          style: {},
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 L20.707,-9.293 L20,-10 Z',
              d: 0
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'asynchArrow',
          label: 'asynch arrow',
          lang: '',
          type: 'normal',
          icon: 'asynch-arraw',
          style: {},
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 Z',
              d: 0
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'diamondArrow',
          label: 'diamond arrow',
          lang: '',
          type: 'normal',
          icon: 'diamond-arrow',
          style: {},
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'diamondArrowEmpty',
          label: 'diamond arrow empty',
          lang: '',
          type: 'normal',
          icon: 'diamond-arrow-empty',
          style: {},
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
              d: 0,
              fill: '#FFFFFF'
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'circleArrow',
          label: 'circle arrow',
          lang: '',
          type: 'normal',
          icon: 'circle-arrow',
          style: {},
          data: {
            style: {
              path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'circleArrowEmpty',
          label: 'circle arrow empty',
          lang: '',
          type: 'normal',
          icon: 'circle-arrow-empty',
          style: {},
          data: {
            style: {
              path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
              d: 0,
              fill: '#FFFFFF'
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'endArrow',
      label: 'end arrow',
      lang: 'L10017',
      type: 'dropdown-list',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['edge'],
        style: {
          'white-space': 'nowrap'
        },
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: false,
      // 子节点
      children: [
        {
          name: 'none',
          label: 'none',
          lang: '',
          type: 'normal',
          icon: 'solid',
          style: {},
          data: false,
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'solidArrow',
          label: 'solid arrow',
          lang: '',
          type: 'normal',
          icon: 'solid-arrow',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M0,0 L20,-10 L20,10 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'normalArrow',
          label: 'normal arrow',
          lang: '',
          type: 'normal',
          icon: 'normal-arrow',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 L20.707,-9.293 L20,-10 Z',
              d: 0
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'asynchArrow',
          label: 'asynch arrow',
          lang: '',
          type: 'normal',
          icon: 'asynch-arraw',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L1.432,0 Z',
              d: 0
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'diamondArrow',
          label: 'diamond arrow',
          lang: '',
          type: 'normal',
          icon: 'diamond-arrow',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'diamondArrowEmpty',
          label: 'diamond arrow empty',
          lang: '',
          type: 'normal',
          icon: 'diamond-arrow-empty',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M0,0 L20,10 L20.707,9.293 L38.568,0 L20.707,-9.293 L20,-10 Z',
              d: 0,
              fill: '#FFFFFF'
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'circleArrow',
          label: 'circle arrow',
          lang: '',
          type: 'normal',
          icon: 'circle-arrow',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
              d: 0
            },
            fill: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'circleArrowEmpty',
          label: 'circle arrow empty',
          lang: '',
          type: 'normal',
          icon: 'circle-arrow-empty',
          style: {
            display: 'inline-block',
            transform: 'rotate(180deg)'
          },
          data: {
            style: {
              path: 'M-10,0 A5,5,0,1,0,10,0 A5,5,0,1,0,-10,0 Z',
              d: 0,
              fill: '#FFFFFF'
            },
            fill: false
          },
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'toFront',
      label: 'To Front',
      lang: 'L10018',
      type: 'normal',
      icon: 'to-front',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: false
      }
    },
    {
      name: 'toBack',
      label: 'To Back',
      lang: 'L10019',
      type: 'normal',
      icon: 'to-back',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['node', 'edge'],
        style: {},
        divider: true
      }
    },
    {
      name: 'selectAll',
      label: 'SelectAll',
      lang: 'L10031',
      type: 'normal',
      icon: 'select-all',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.selectAll,
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'marquee',
      label: 'Marquee',
      lang: 'L10020',
      type: 'normal',
      icon: 'marquee',
      enableTool: false,
      enable: false,
      enableMode: [],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'group',
      label: 'Group',
      lang: 'L10021',
      type: 'normal',
      icon: 'group',
      enableTool: false,
      enable: false,
      enableMode: [],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'ungroup',
      label: 'Ungroup',
      lang: 'L10022',
      type: 'normal',
      icon: 'ungroup',
      enableTool: false,
      enable: false,
      enableMode: [],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: [],
        style: {},
        divider: true
      }
    },
    {
      name: 'preview',
      label: 'preview',
      lang: 'L10024',
      type: 'dropdown-list',
      icon: 'edit',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview', 'paramsEdit'],
      disabled: false,
      disabledMode: ['edit', 'preview', 'paramsEdit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 'edit',
          label: '完全模式',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: 'edit',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'paramsEdit',
          label: '微调模式',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: 'paramsEdit',
          position: 'center',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'preview',
          label: '只读模式',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: 'preview',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'run',
          label: '运行模式',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: 'run',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'upload',
      label: 'upload',
      lang: 'L10033',
      type: 'normal',
      icon: 'upload',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'download',
      label: 'download',
      lang: 'L10030',
      type: 'dropdown-list',
      icon: 'download',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 'image',
          label: '导出为图片',
          lang: '',
          type: 'normal',
          style: {},
          data: 'image',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'json',
          label: '导出为JSON数据',
          lang: '',
          type: 'normal',
          style: {},
          data: 'json',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'excel',
          label: '导出为excel数据',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: 'excel',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'layout',
      label: 'Layout',
      lang: 'L10035',
      type: 'dropdown-list',
      icon: 'layout',
      enableTool: false,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'center',
        style: {},
        divider: true
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: true
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 'random',
          label: 'random',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'random'
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'force',
          label: 'force',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'force'
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'fruchterman',
          label: 'fruchterman',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'fruchterman',
            gravity: 5,
            speed: 5
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'circular',
          label: 'circular',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'circular'
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'radial',
          label: 'radial',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'radial',
            unitRadius: 50
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'mds',
          label: 'mds',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'mds',
            linkDistance: 100
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'dagre',
          label: 'dagre',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'dagre',
            ranksep: 70,
            controlPoints: true
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'concentric',
          label: 'concentric',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'concentric',
            maxLevelDiff: 0.5,
            sortBy: 'degree'
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'grid',
          label: 'grid',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'grid',
            begin: [20, 20]
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'compactbox',
          label: 'compactbox',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'compactBox',
            direction: 'LR',
            getId: function getId (d) {
              return d.id
            },
            getHeight: function getHeight () {
              return 16
            },
            getWidth: function getWidth () {
              return 16
            },
            getVGap: function getVGap () {
              return 10
            },
            getHGap: function getHGap () {
              return 100
            }
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'dendrogram',
          label: 'dendrogram',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'dendrogram',
            direction: 'LR', // H / V / LR / RL / TB / BT
            nodeSep: 30,
            rankSep: 100
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'indented',
          label: 'indented',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'indented',
            isHorizontal: true,
            direction: 'LR',
            indent: 30,
            getHeight: function getHeight () {
              return 16
            },
            getWidth: function getWidth () {
              return 16
            }
          },
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'mindmap',
          label: 'mindmap',
          lang: '',
          type: 'normal',
          icon: '',
          style: {},
          data: {
            type: 'mindmap',
            direction: 'H',
            getHeight: () => {
              return 16
            },
            getWidth: () => {
              return 16
            },
            getVGap: () => {
              return 10
            },
            getHGap: () => {
              return 50
            }
          },
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'fullscreen',
      label: 'fullscreen',
      lang: 'L10025',
      type: 'normal',
      icon: 'full-screen',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'language',
      label: 'language',
      lang: 'L10026',
      type: 'dropdown-list',
      icon: 'language',
      enableTool: false,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: true,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 'zh-CN',
          label: '简体中文',
          lang: '',
          type: 'normal',
          icon: '',
          img: require('../assets/images/langs/zh-CN.png'),
          style: {},
          data: 'zh-CN',
          enable: true,
          disabled: false,
          divider: false
        },
        {
          name: 'en-US',
          label: 'English',
          lang: '',
          type: 'normal',
          icon: '',
          img: require('../assets/images/langs/en-US.png'),
          style: {},
          data: 'en-US',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    {
      name: 'github',
      label: 'github',
      lang: 'L10027',
      type: 'link',
      icon: 'github',
      link: system.github,
      enableTool: false,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'feedback',
      label: 'feedback',
      lang: 'L10028',
      type: 'link',
      icon: 'feedback',
      link: system.feedback,
      enableTool: false,
      enable: false,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      }
    },
    {
      name: 'help',
      label: 'help',
      lang: 'L10036',
      type: 'dropdown-list',
      icon: 'help',
      enableTool: true,
      enable: true,
      enableMode: ['edit', 'preview'],
      disabled: false,
      disabledMode: ['edit', 'preview'],
      shortcuts: '',
      toolbar: {
        enable: true,
        position: 'right',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: true,
        target: ['canvas'],
        style: {},
        divider: false
      },
      // 默认选中项index
      selected: 0,
      lockLabel: true,
      // 子节点
      children: [
        {
          name: 'shortcutList',
          label: 'shortcut list',
          lang: 'L10038',
          type: 'normal',
          icon: '',
          style: {},
          data: 'shortcutList',
          enable: true,
          disabled: false,
          divider: false
        }
      ]
    },
    // FIXME 纯快捷键
    {
      name: 'up',
      label: 'Up',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.up,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'down',
      label: 'Down',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.down,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'left',
      label: 'Left',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.left,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    },
    {
      name: 'right',
      label: 'Right',
      lang: '',
      type: 'shortcut',
      icon: '',
      enableTool: true,
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      shortcuts: shortcutMap.right,
      toolbar: {
        enable: false,
        position: '',
        style: {},
        divider: false
      },
      contextmenu: {
        enable: false,
        target: [],
        style: {},
        divider: false
      }
    }
  ]
  const sysList = [
    {
      name: '系统',
      label: 'File',
      type: 'normal',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      }
    }, {
      name: '系统',
      label: 'Edit',
      type: 'normal',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      }
    }, {
      name: '系统',
      label: 'View',
      type: 'normal',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      }
    }, {
      name: '系统',
      label: 'Help',
      type: 'normal',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      }
    }
  ]
   const functionlist = [
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '绘图模式',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      }
    },
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '潮流计算模式',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '开始潮流计算',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '波形单位设定',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '生成结果报告',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    },
    // 谐波分析模式
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '谐波分析模式',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '开始谐波计算',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '扫频分析',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '谐波波形',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '波形单位设定',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    },

    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '短路计算',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '三相接地短路',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '单相接地短路',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '三相断路',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    },

    // 继电保护
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '继电保护',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '设置故障',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        },
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '运行继电保护',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    },

    // 可靠性计算模式
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '可靠性计算模式',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '可靠性计算',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    },
    // 时域仿真模式
    {
      name: '绘图模式',
      label: '绘图模式',
      type: 'normal',
      icon: '时域仿真模式',
      enable: true,
      enableMode: ['edit'],
      disabled: false,
      disabledMode: ['edit'],
      toolbar: {
        enable: true,
        position: 'left',
        style: {},
        divider: false
      },
      child: [
        {
          name: '绘图模式',
          label: '绘图模式',
          type: 'normal',
          icon: '时域仿真',
          enable: true,
          enableMode: ['edit'],
          disabled: false,
          disabledMode: ['edit'],
          toolbar: {
            enable: true,
            position: 'left',
            style: {},
            divider: false
          }
        }
      ]
    }
  ]
  // 处理禁用或启用
  if (Array.isArray(disableTools) && disableTools.length) {
    toolList = toolList.filter(item => !disableTools.includes(item.name))
  } else if (Array.isArray(enableTools) && enableTools.length) {
    toolList = toolList.filter(item => enableTools.includes(item.name))
  }
  return {
    shortcutMap,
    toolList,
    sysList,
    functionlist
  }
}
