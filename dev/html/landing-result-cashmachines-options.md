---
layout: default
---

<div class="row">
	<div class="col-md-12">

		<h1 class="body-font">Find a branch, ATM or expert</h1>

		{% include cashmachines/searchbox.liquid  style = "" text = "Less" class = " is-open" %}

	</div>
</div>

<div class="row">
	<div class="col-md-12">
		{% include cashmachines/search-result.liquid %}
	</div>
</div>