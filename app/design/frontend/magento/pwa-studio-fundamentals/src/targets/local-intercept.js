module.exports = (targets) => {
    targets.of('@magento/venia-ui').routes.tap((routes) => {
        routes.push({
            name: 'MyGreetingRoute',
            pattern: '/greeting/:who?',
            path: require.resolve('../components/GreetingPage/greetingPage.js')
        });
        routes.push({
            name: 'CustomerQuestionShow',
            pattern: '/tigren_question/index',
            path: require.resolve('../components/Tigren_question_show/show.js')
        });
        routes.push({
            name: 'CreateQuestion',
            pattern: '/tigren_question/create',
            path: require.resolve(
                '../components/Tigren_question_create/create.js'
            )
        });
        return routes;
    });
};
