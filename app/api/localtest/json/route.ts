import {NextResponse} from 'next/server'

export async function GET(request: Request) {
    return NextResponse.json([
            {
                'label': '测试框1',
                'dataIndex': 'testDataInput1',
                'widget': 'input',
                'defaultValue': '1',
                'widgetProps': {
                    'placeholder': '请输入'
                }
            },
            {
                'label': '测试框2',
                'dataIndex': 'testDataInput2',
                'widget': 'input',
                'defaultValue': '1',
                'widgetProps': {
                    'placeholder': '请输入'
                }
            },
            {
                'label': '测试框3',
                'dataIndex': 'testDataInput3',
                'widget': 'input',
                'defaultValue': '1',
                'widgetProps': {
                    'placeholder': '请输入'
                }
            },
            {
                'label': '面选择器',
                'dataIndex': 'testDataInput4',
                'widget': 'surfaceSelector',
                'widgetProps': {
                    'placeholder': '请输入'
                }
            },
            {
                'label': '测试框5',
                'dataIndex': 'testDataInput5',
                'widget': 'select',
                'defaultValue': '1',
                'widgetProps': {
                    'placeholder': '请输入',
                    'options': [
                        {
                            label: 'select1',
                            value: '1'
                        },
                        {
                            label: 'select2',
                            value: '2'
                        }
                    ]
                }
            },
            // {
            //     'label': '测试框6',
            //     'dataIndex': 'testDataInput6',
            //     'widget': 'input',
            //     'widgetProps': {
            //         'defaultValue': '1',
            //         'placeholder': '请输入'
            //     }
            // }
        ]
    )
}
