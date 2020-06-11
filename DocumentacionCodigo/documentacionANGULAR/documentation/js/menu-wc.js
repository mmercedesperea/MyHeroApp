'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link">AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AdminModule-415158acfa000898251c6b0f2438bc6b"' : 'data-target="#xs-components-links-module-AdminModule-415158acfa000898251c6b0f2438bc6b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AdminModule-415158acfa000898251c6b0f2438bc6b"' :
                                            'id="xs-components-links-module-AdminModule-415158acfa000898251c6b0f2438bc6b"' }>
                                            <li class="link">
                                                <a href="components/AddHeroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddHeroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditHeroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditHeroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MainComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserListComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">UserListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AdminRoutingModule.html" data-type="entity-link">AdminRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-36053becbb036385d472090d58c820ab"' : 'data-target="#xs-components-links-module-AppModule-36053becbb036385d472090d58c820ab"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-36053becbb036385d472090d58c820ab"' :
                                            'id="xs-components-links-module-AppModule-36053becbb036385d472090d58c820ab"' }>
                                            <li class="link">
                                                <a href="components/AboutUsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutUsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AdminDeleteUserDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AdminDeleteUserDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AvatarDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AvatarDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangePassDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangePassDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ComentHeroDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ComentHeroDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DeleteUserDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DeleteUserDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FightComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FightComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FightHeroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FightHeroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FightTeamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FightTeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeroesDetailComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeroesDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeroesSearchComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeroesSearchComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ModalsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyHeroesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyHeroesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PublicProfileComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PublicProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SelectTeamDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SelectTeamDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TeamDialogComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TeamDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/selectHeroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">selectHeroComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/Hero.html" data-type="entity-link">Hero</a>
                            </li>
                            <li class="link">
                                <a href="classes/Team.html" data-type="entity-link">Team</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserHero.html" data-type="entity-link">UserHero</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GlobalVariableService.html" data-type="entity-link">GlobalVariableService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeroService.html" data-type="entity-link">HeroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TeamService.html" data-type="entity-link">TeamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserHeroService.html" data-type="entity-link">UserHeroService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link">AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});