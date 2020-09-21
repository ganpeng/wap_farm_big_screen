import router from './routers'

router.beforeEach((to, from, next) => {
    next();
});

router.afterEach(() => {
});

export default router;
