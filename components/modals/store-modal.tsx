"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";

import {
  FieldValues,
  UseFormReturn,
  FieldPath,
  PathValue,
} from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";

//DECLARACIONES PARA EL FORM DE SHADCN
const locationData = {
  "San José": {
    cantons: ["Cantón 1", "Cantón 2"],
    districts: {
      "Cantón 1": ["Distrito 1", "Distrito 2"],
      "Cantón 2": ["Distrito 3", "Distrito 4"],
    },
  },
  Alajuela: {
    cantons: ["Cantón 3", "Cantón 4"],
    districts: {
      "Cantón 3": ["Distrito 5", "Distrito 6"],
      "Cantón 4": ["Distrito 7", "Distrito 8"],
    },
  },
  // Agrega aquí las demás provincias
};

const formSchema = z.object({
  name: z.string().nonempty("Store name is required"),
  address: z
    .string()
    .refine((value) => value.trim() !== "", "Address is required!"),
  province: z.string(),
  canton: z.string(),
  district: z.string(),
});

//METODOS PARA EL JSX

export const StoreModal = () => {
  //hooks al inicio, lo demas es para el jsx
  const storeModal = useStoreModal(); //hook para abrir y cerrar el modal

  const [height, setHeight] = useState("auto");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextAreaChange =
    (field: any) => (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = event.target.value;
      field.onChange(text); // Actualiza el valor del Textarea siempre
      if (text.replace(/\s/g, "") === "") {
        setHeight("auto"); // Establece la altura a 'auto' cuando el Textarea está vacío
      } else {
        setHeight(`${textareaRef.current!.scrollHeight}px`);
      }
    };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //valores por defecto
      name: "",
      address: "",
      province: "",
      canton: "",
      district: "",
    },
  });

  const locationData: {
    //mapea las provincias y sus cantones y distritos
    [key: string]: {
      cantons: string[];
      districts: { [key: string]: string[] };
    };
  } = {
    "San José": {
      cantons: ["Cantón 1", "Cantón 2"],
      districts: {
        "Cantón 1": ["Distrito 1", "Distrito 2"],
        "Cantón 2": ["Distrito 3", "Distrito 4"],
      },
    },
    Alajuela: {
      cantons: ["Cantón 3", "Cantón 4"],
      districts: {
        "Cantón 3": ["Distrito 5", "Distrito 6"],
        "Cantón 4": ["Distrito 7", "Distrito 8"],
      },
    },
    // Add other provinces here
  };

  const province = form.watch("province"); //obtiene el valor de la provincia
  const canton = form.watch("canton"); //obtiene el valor del canton

  const cantons = province ? locationData[province].cantons : []; //obtiene los cantones de la provincia
  const districts =
    province && canton ? locationData[province].districts[canton] : []; //obtiene los distritos de la provincia y canton

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //maneja el submit del formulario
    // TODO: Create the store
    console.log({ values });
  };

  const handleProvinceChange = //maneja el cambio de provincia

      <TFieldValues extends FieldValues>( //tipado
        form: UseFormReturn<TFieldValues>,
        field: FieldPath<TFieldValues>
      ) =>
      (value: TFieldValues[FieldPath<TFieldValues>]) => {
        //maneja el cambio de provincia
        form.setValue(
          //setea los valores de canton y distrito
          "canton" as FieldPath<TFieldValues>,
          "" as PathValue<TFieldValues, FieldPath<TFieldValues>>
        );
        form.setValue(
          //setea los valores de canton y distrito
          "district" as FieldPath<TFieldValues>,
          "" as PathValue<TFieldValues, FieldPath<TFieldValues>>
        );
        form.setValue(field, value); //setea el valor de la provincia
      };

  return (
    <Modal
      title="Add a new Store"
      description="Add a new store for manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      {/*manejo de errores */}
                      <Input placeholder="Store Name" {...field} />
                    </FormControl>
                    <FormMessage /> {/*muestra los errores */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Address</FormLabel>
                    <FormControl>
                      <Textarea
                        ref={textareaRef}
                        value={field.value}
                        onChange={handleTextAreaChange(field)}
                        style={{ height, maxHeight: "200px" }}
                        className="resize-none"
                        placeholder="Store Address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select
                      onValueChange={handleProvinceChange(form, field.name)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="San José">San José</SelectItem>
                        <SelectItem value="Alajuela">Alajuela</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {province && (
                <FormField
                  control={form.control}
                  name="canton"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canton</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a canton" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cantons.map((canton: string) => (
                            <SelectItem key={canton} value={canton}>
                              {canton}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {canton && (
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Distrito</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a district" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district} value={district}>
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" onClick={storeModal.onClose}>
                  Cancel
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
