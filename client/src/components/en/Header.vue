
<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <router-link to='/' class="navbar-brand">wfucsd</router-link>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <router-link to="/Members" active-class="active" tag="li"><a>Members</a></router-link>
                    <router-link to="/lottery" active-class="active" tag="li"><a>Lottery</a></router-link>
                    <router-link to="/Marketplace" active-class="active" tag="li"><a>Marketplace</a></router-link>
                </ul>
                 <!-- add nav link to navbar-right-->
                <ul class="nav navbar-nav navbar-right">
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>
</template>
