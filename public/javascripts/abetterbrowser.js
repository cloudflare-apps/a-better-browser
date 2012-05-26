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
		 * Our style rules.
		 */
		var rules =
			'#bad_browser {' +
				'border-bottom: 1px solid #000;' +
				'background: #45484d;' +
				'position: absolute;' +
				'z-index: 10000;' +
				'width: 100%;' +
				'top: 0;' +
				'left: 0;' +
				'padding: 8px 0;' +
				'font-family: "Segoe UI", sans-serif;' +
				'font-size: 18px;' +
				'text-align: center;' +
				'color: #FFF;' +
			'}' +
			
			'#bad_browser a {' +
				'text-decoration: underline;' +
				'color: #EBEBF4' +
			'}' +
			
			'#bad_browser a:hover, #bad_browser a:active {' +
				'text-decoration: none;' +
				'color: #dbdbeb' +
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
		 * Injects our message into the body.
		 */
		var message = document.createElement( 'div' );
		message.id = 'bad_browser';
		message.innerHTML = 'You are using an outdated browser. <a href="http://abetterbrowser.org/">More information &#187;</a>';
		
		document.getElementsByTagName( 'body' )[ 0 ].appendChild( message );
	}
	catch( e )
	{
		//
	}
} );
