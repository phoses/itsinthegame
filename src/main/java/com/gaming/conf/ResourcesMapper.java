package com.gaming.conf;

import java.io.IOException;

import org.springframework.hateoas.Resources;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.module.SimpleModule;

/**
 * <Begin long explanation of why this class was created...>
 * 
 * 
 * By default, Spring Data Rest uses a format called HATEOAS (http://en.wikipedia.org/wiki/HATEOAS)
 * to output the data returned from a Repository. The results from findAll(), findByName(), etc. are
 * wrapped in an Object called Resources. When this Resources object is converted to JSON, it adds
 * additional fields to the JSON so that we don't just get back a list of Estate objects.
 * 
 * For our EstateRepository, the default output would like something like this for the /estate :
 * 
 * {
    "_links": {
        "search": {
            "href": "http://localhost:8080/estate/search"
        }
    },
    "_embedded": {
        "estates": [
            {
                "name": "Foo",
                "url": null,
                "duration": 100,
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/estate/1"
                    }
                }
            }
        ]
    }
}
 * You can comment out the Application.halObjectMapper() and rerun the application if you would
 * like to see what the default format looks like with full HATEOAS.
 * 
 * For this simple example, the extra HATEOAS "_embedded" and "_links" formatting for the top-level
 * JSON adds extra complexity. Because of the format, we can't just directly unmarshall this response
 * into a list of Estate objects.
 * 
 * To simplify this example and make it possible to directly unmarshall the responses as a list of 
 * Estate objects, this ObjectMapper overrides the default JSON marshalling of Spring Data Rest so
 * that it outputs this instead:
 * 
 * [
    {
        "name": "Foo",
        "url": null,
        "duration": 100,
        "_links": {
            "self": {
                "href": "http://localhost:8080/estate/1"
            }
        }
    }
   ]
 * 
 * This alternate format allows us to directly unmarshall the HTTP response bodies from the EstateRepository
 * into a list of Estate objects.
 * 
 * @author jules
 *
 */
public class ResourcesMapper extends ObjectMapper {

	private static final long serialVersionUID = -2272070717153464708L;
	// This anonymous inner class will handle conversion of the Spring Data Rest
	// Resources objects into JSON. Resources are objects that Spring Data Rest
	// creates with the Estates it obtains from your EstateRepository
	@SuppressWarnings("rawtypes")
	private JsonSerializer<Resources> serializer = new JsonSerializer<Resources>() {

		// We are going to register this class to handle all instances of type
		// Resources
		@Override
		public Class<Resources> handledType() {
			return Resources.class;
		}

		@Override
		public void serialize(Resources value, JsonGenerator jgen,
				SerializerProvider provider) throws IOException,
				JsonProcessingException {
			// Extracted the actual data inside of the Resources object
			// that we care about (e.g., the list of Estate objects)
			Object content = value.getContent();
			// Instead of all of the Resources member variables, etc.
			// Just mashall the actual content (Estates) into the JSON
			JsonSerializer<Object> s = provider.findValueSerializer(
					content.getClass(), null);
			s.serialize(content, jgen, provider);
		}
	};
	
	// Create an ObjectMapper and tell it to use our customer serializer
	// to convert Resources objects into JSON
	public ResourcesMapper() {
		SimpleModule module = new SimpleModule();
		module.addSerializer(serializer);
		registerModule(module);
	}

}
