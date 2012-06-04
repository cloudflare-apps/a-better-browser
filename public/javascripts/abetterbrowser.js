// View on GitHub: https://github.com/xPaw/CF-ABetterBrowser

CloudFlare.define( 'abetterbrowser', [ 'cloudflare/dom' ], function( version )
{
	var version = version.internetExplorer;
	
	/**
	 * Is user using IE? Is it old?
	 */
	if( version === undefined || version > 7 )
	{
		return true;
	}
	
	try
	{
		/**
		 * j.mp is bitly, let's collect some referral statistics.
		 */
		var moreInformationLink = 'http://j.mp/abetterbrowser';
		
		/**
		 * Translations.
		 */
		var translations =
		{
			'en-US': 'You are using an outdated browser. <a href="' + moreInformationLink + '">More information &#187;</a>',
			'ru'   : 'Вы используете устаревший браузер. <a href="' + moreInformationLink + '">Подробнее &#187;</a>',
			'fr'   : 'Votre navigateur n\'est pas à jour. <a href="' + moreInformationLink + '">Plus d\'information &#187;</a>',
			'da'   : 'Du bruger en ældre browser. <a href="' + moreInformationLink + '">Mere information &#187;</a>',
			'de'   : 'Sie benutzen einen veralteten browser. <a href="' + moreInformationLink + '">Mehr informationen &#187;</a>'
		};
		
		/**
		 * Style rules.
		 */
		var rules =
			'#cloudflare-old-browser {' +
				'border-bottom: 1px solid #000;' +
				'background: #45484d;' +
				'position: absolute;' +
				'z-index: 10000;' +
				'width: 100%;' +
				'top: 0;' +
				'left: 0;' +
				'overflow: hidden;' +
				'padding: 8px 0;' +
				'font-family: "Segoe UI", sans-serif;' +
				'font-size: 18px;' +
				'text-align: center;' +
				'color: #FFF;' +
			'}' +
			
			'#cloudflare-old-browser a {' +
				'text-decoration: underline;' +
				'color: #EBEBF4' +
			'}' +
			
			'#cloudflare-old-browser a:hover, #cloudflare-old-browser a:active {' +
				'text-decoration: none;' +
				'color: #dbdbeb' +
			'}' +
			
			'#cloudflare-old-browser .display-in-english {' +
				'font-style: italic;' +
				'margin-right: 10px;' +
				'position: absolute;' +
				'right: 0;' +
				'display: inline;' +
				'cursor: pointer' +
			'}';
		
		/**
		 * Injects style rules into the document to handle formatting.
		 */
		var style = document.createElement( 'style' );
		style.setAttribute( 'type', 'text/css' );
		
		if( style.styleSheet )
		{
			style.styleSheet.cssText = rules;
		}
		else
		{
			style.appendChild( document.createTextNode( rules ) );
		}
		
		var head = document.getElementsByTagName( 'head' )[ 0 ];
		var firstChild = head.firstChild;
		head.insertBefore( style, firstChild );
		
		/**
		 * Detect user's browser language.
		 *
		 * This is aimed at IE, so we don't try to get navigator.language.
		 */
		var language    = window.navigator.browserLanguage || window.navigator.userLanguage;
		var translation = translations[ language ] || translations[ 'en-US' ];
		
		/**
		 * Create our message.
		 */
		var message = document.createElement( 'div' );
		message.id = 'cloudflare-old-browser';
		message.innerHTML = translation;
		
		/**
		 * Add "display in english" when displaying non-english phrase.
		 */
		if( translations[ language ] && language.substring( 0, 2 ) != 'en' )
		{
			var english = document.createElement( 'div' );
			english.className = 'display-in-english';
			english.innerText = 'display in english';
			
			english.onclick = function( )
			{
				message.innerHTML = translations[ 'en-US' ];
			};
			
			message.appendChild( english );
		}
		
		/**
		 * Injects our message into the body.
		 */
		document.getElementsByTagName( 'body' )[ 0 ].appendChild( message );
	}
	catch( e )
	{
		//
	}
} );
