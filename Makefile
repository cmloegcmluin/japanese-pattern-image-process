process:
	node bin/emptyDirectory 'data/input' && node bin/processData && node bin/emptyDirectory 'data/output' && node bin/processImages
