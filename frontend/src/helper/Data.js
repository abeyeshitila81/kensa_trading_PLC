
const Data=[
    {
        label:"Home",
        to:"home"
    },
    {
        label:"Profile",
        to:"profile",
        children:[
            {
                label:"Detail",
                to:"detail",
                children:[
                    {
                        label:"Location",
                        to:"location",
                        children:[
                            {
                                label:"City",
                                to:"city"
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label:"Setting",
        to:"setting",
        children:[
            {
                label:"Account",
                to:"account"
            },
            {
                label:"Security",
                to:"security",
                children:[
                    {
                        label:"Login",
                        to:"login"
                    },
                    {
                        label:"Register",
                        to:"register"
                    }
                ]
            }
        ]

    }
]
export default Data